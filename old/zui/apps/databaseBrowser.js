/*

   Copyright 2017 Jeffrey Hullekes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

 */

ZUI.apps.databaseBrowser = function () {
    "use strict"

    var my = {}

    my.containerTypeProperties = {
        databaseBrowserRoot: {
            drawContainer: false,
            showHeader: false,
            hasPadding: false,
            keepAspectRatio: true,
            childrenFitFunction: "normalizedRelativePositioning",
        },
        table: {
            drawContainer: true,
            showHeader: true,
            showHeaderText: true,
            showHeaderIcon: false,
            connectOutgoingTo: "4-directions",
            connectIncomingTo: "4-directions",
            hasPadding: false,
            hasFixedHeaderHeight: true,
            headerHeight: 50,
            childrenFitFunction: "normalizedRelativePositioning",
            /*
             dataItemGroups: {
             basicInfo: [
             { containerDataKey: "label", displayName: "Name" },
             { containerDataKey: "location", displayName: "Location" },
             ]
             },
             */
            containerHeaderColor: {r: 67, g: 136, b: 204, a: 0.2},
            containerHeaderBorderColor: {r: 27, g: 50, b: 128, a: 0.2}
        },
        dataRowKey: {
            drawContainer: true,
            showHeader: false,
            connectOutgoingTo: "4-directions",
            connectIncomingTo: "4-directions",
            hasPadding: false,
            childrenFitFunction: "normalizedRelativePositioning",
            showContainerText: true,
            containerTextNormalizedFontHeight: 24,
            containerTextColor: {r: 50, g: 50, b: 50, a: 1.0},
        },
        dataRowValue: {
            drawContainer: true,
            showHeader: false,
            connectOutgoingTo: "4-directions",
            connectIncomingTo: "4-directions",
            hasPadding: false,
            childrenFitFunction: "normalizedRelativePositioning",
            showContainerText: true,
            containerTextNormalizedFontHeight: 24,
            containerTextColor: {r: 50, g: 50, b: 50, a: 1.0},
        },
        joinLabel: {
            drawContainer: true,
            positionPointsTo: "center",
            shape: "ellipse",
            containerBorderNormalizedWidth: 1,
            positionAsPercentageOfCurve: 0.5,

            showContainerText: true,
            containerTextColor: {r: 255, g: 255, b: 255, a: 1.0},
            containerTextNormalizedFontHeight: 36,
            containerTextCutOffTextWhenNoMoreRoom: false,
            containerTextWrapTextWhenNoMoreRoom: false,
        },
    }

    my.connectionTypeProperties = {
        join: {}
    }

    my.currentJoinsActive = []
    // FIXME: this just is to know we started a new firstTable/Field/Value. We should do this using some kind of boolean to signify a reset to position to the first table.
    my.currentFirstTable = null
    my.currentFirstTableField = null
    my.currentFirstTableValue = null

    my.convertDatabaseDataToZUIContainers  = function (world, databaseData) {

        var tables = databaseData.tables
        var joins = databaseData.joins
        var chosenJoins = databaseData.chosenJoins

        ZUI.clearWorldContent(world)

        ZUI.setContainerTypeProperties(my.containerTypeProperties)
        ZUI.setConnectionTypeProperties(my.connectionTypeProperties)

        var rootContainer = ZUI.addWorldContainer(world, null, "root", "databaseBrowserRoot")

        rootContainer.normalizedSize.width = window.innerWidth
        rootContainer.normalizedSize.height = window.innerHeight

        // FIXME: HACK using currentJoinsActive
        my.currentJoinsActive = chosenJoins

        var tableWithVisibleConnection = {}

        var connections = []
        for (var joinIdentifier in joins) {
            var join = joins[joinIdentifier]

            var hideConnection = false
            if (tables[join.from.table].data == null && tables[join.to.table].data == null) {
                hideConnection = true
            }
            else {
                tableWithVisibleConnection[join.from.table] = true
                tableWithVisibleConnection[join.to.table] = true
            }
            // TODO: do we want to SHOW a direction in the join
            if (!join.showReversed) {
                connections.push(
                    {
                        // FIXME: from and to are reverted!
                        from: 'table_' + join.to.table,
                        to: 'table_' + join.from.table,
                        type: "join",
                        identifier: joinIdentifier,
                        hide: hideConnection,
                    }
                )
            }
            else {
                connections.push(
                    {
                        // FIXME: from and to are reverted!
                        from: 'table_' + join.from.table,
                        to: 'table_' + join.to.table,
                        type: "join",
                        identifier: joinIdentifier,
                        hide: hideConnection,
                    }
                )
            }
        }

        for (var tableIdentifier in tables) {
            var table = tables[tableIdentifier]

            var overrulingContainerProperties = null

            if (!tableWithVisibleConnection.hasOwnProperty(tableIdentifier)) {
                continue;
            }

            // TODO: for now all table-containers are in root
            var parentContainer = rootContainer

            if (table.data == null) {
                overrulingContainerProperties = {
                    containerColor: {r: 200, g: 200, b: 200, a: 0.03},
                    containerBorderColor: {r: 150, g: 150, b: 150, a: 0.03},
                    containerHeaderColor: {r: 67, g: 136, b: 204, a: 0.03},
                    containerHeaderBorderColor: {r: 27, g: 50, b: 128, a: 0.03}
                }
            }
            var tableContainer = ZUI.addWorldContainer(world, parentContainer, "table_" + table.identifier, 'table', overrulingContainerProperties)

            tableContainer.containerData.id = table.identifier
            tableContainer.containerData.label = table.identifier

            tableContainer.normalizedSize.width = parseInt(table.size.width)
            tableContainer.normalizedSize.height = parseInt(table.size.height)

            tableContainer.normalizedPosition.x = parseInt(table.position.x) || 0
            tableContainer.normalizedPosition.y = -parseInt(table.position.y) || 0

            tableContainer.opacity = 0.2

            if (table.orderedData != null) {

                var verticalPositionInTable = parseInt(table.size.height - table.size.height * 0.45)
                for (var dataIndex = 0; dataIndex < table.orderedData.length; dataIndex++) {
                    // FIXME: we do not show more than 2 rows!
                    if (dataIndex > 1) break;

                    var data = table.orderedData[dataIndex]

                    var dataRowKey = ''
                    var dataRowValue = ''
                    for (var key in data) {
                        dataRowKey = key
                        dataRowValue = data[key]
                    }

                    overrulingContainerProperties = null

                    var dataRowContainer = ZUI.addWorldContainer(world, tableContainer, "dataRow_" + table.identifier + "_" + dataIndex, 'dataRowKey', overrulingContainerProperties)

                    dataRowContainer.containerData.id = "dataRow_" + table.identifier + "_" + dataIndex
                    dataRowContainer.containerData.label = dataRowKey

                    dataRowContainer.normalizedSize.width = parseInt(table.size.width * 0.4)
                    dataRowContainer.normalizedSize.height = parseInt(table.size.height * 0.3)

                    dataRowContainer.normalizedPosition.x = parseInt(table.size.width * 0.05)
                    dataRowContainer.normalizedPosition.y = verticalPositionInTable

                    var dataRowContainer = ZUI.addWorldContainer(world, tableContainer, "dataRowValue_" + table.identifier + "_" + dataIndex, 'dataRowValue', overrulingContainerProperties)

                    dataRowContainer.containerData.id = "dataRowValue_" + table.identifier + "_" + dataIndex
                    dataRowContainer.containerData.label = dataRowValue

                    dataRowContainer.normalizedSize.width = parseInt(table.size.width * 0.4)
                    dataRowContainer.normalizedSize.height = parseInt(table.size.height * 0.3)

                    dataRowContainer.normalizedPosition.x = parseInt(table.size.width * 0.5)
                    dataRowContainer.normalizedPosition.y = verticalPositionInTable

                    verticalPositionInTable -= table.size.height * 0.4

                }

            }

        }

        for (var loopIndex = 0; loopIndex < connections.length; loopIndex++) {
            var connection = connections[loopIndex]

            var overrulingConnectionProperties = null

            //        console.log(tables[connection.from])
            if (!connection.hide) {
                /*
                 overrulingConnectionProperties = {
                 arrowLineColor: {r: 100, g: 100, b: 100, a: 0.0},
                 arrowHeadColor: {r: 100, g: 100, b: 100, a: 0.0},
                 }
                 */

                var worldConnection = ZUI.addWorldConnection(world, connection.from, connection.to, connection.type, overrulingConnectionProperties)

                if (true) {
                    overrulingContainerProperties = null
                    var joinLabelContainer = ZUI.addWorldContainer(world, worldConnection, connection.identifier, 'joinLabel', overrulingContainerProperties)

                    joinLabelContainer.containerData.label = ''
                    //joinLabelContainer.containerData.label = ''

                    joinLabelContainer.normalizedSize.width = 60
                    joinLabelContainer.normalizedSize.height = 60

                    joinLabelContainer.positionAsPercentageOfCurve = 0.5
                }
            }

        }

        var initContainerData = world.initData.containerData
        var firstTable = initContainerData.itemType
        var firstTableField = initContainerData.fieldName
        var firstTableValue = initContainerData.fieldValue
        if (my.currentFirstTable == null || firstTable != my.currentFirstTable || firstTableField != my.currentFirstTableField || firstTableValue != my.currentFirstTableValue) {
            ZUI.setInitialContainerIdentifierToCenterOn(world, "table_" + firstTable)
            my.currentFirstTable = firstTable
            my.currentFirstTableField = firstTableField
            my.currentFirstTableValue = firstTableValue
        }

    }

    ZUI.callbacks.getTablesAndJoinsDataCallback = null

    my.domain = null
    my.url = null
    my.client = null
    my.environment = null
    my.firstDatabase = null

    my.reloadDatabaseWorld = function (world) {

        var initContainerData = world.initData.containerData

        // FIXME: check if this contains a pipe (|), then we don't know the itemType!
        var firstTable = initContainerData.itemType
        var firstTableField = initContainerData.fieldName
        var firstTableValue = initContainerData.fieldValue

        my.url += "&client=" + my.client
        my.url += "&environment=" + my.environment
        my.url += "&firstDatabase=" + my.firstDatabase
        my.url += "&firstTable=" + firstTable
        my.url += "&firstTableField=" + firstTableField
        my.url += "&firstTableValue=" + firstTableValue

        var currentJoinsActiveParameter = '&currentJoinsActive='
        currentJoinsActiveParameter += my.currentJoinsActive.join('|')

        var script = document.createElement('script')
        script.src = my.url + currentJoinsActiveParameter + "&jsonp=1" + "&jsonpCallbackFunction=ZUI.callbacks.getTablesAndJoinsDataCallback"

        ZUI.callbacks.getTablesAndJoinsDataCallback = function (databaseData) {
            my.convertDatabaseDataToZUIContainers(world, databaseData)
            script.parentNode.removeChild(script)
        }

        document.querySelector('head').appendChild(script)
    }

    my.databaseSliceContainerWasDoubleClicked = function (sliceContainer) {

        var worldContainer = sliceContainer.worldContainer

        if (worldContainer.type == "joinLabel") {

            var indexInCurrentJoinsActive = my.currentJoinsActive.indexOf(worldContainer.identifier)
            if (indexInCurrentJoinsActive >= 0) {
                my.currentJoinsActive.splice(indexInCurrentJoinsActive, 1)
            }
            else {
                my.currentJoinsActive.push(worldContainer.identifier)
            }

            // FIXME: DIRTY HACK!
            my.databaseWorld.mustReloadWorld = true
        }

    }

    my.databaseWorld = ZUI.world.createNewWorld()
    ZUI.setContainerTypeProperties(my.databaseWorld, my.containerTypeProperties)
    ZUI.setConnectionTypeProperties(my.databaseWorld, my.connectionTypeProperties)
    ZUI.setContainerWasDoubleClickedOutputListener(my.databaseWorld, my.databaseSliceContainerWasDoubleClicked)
    ZUI.setReloadWorldFunction(my.databaseWorld, my.reloadDatabaseWorld)
    my.databaseWorld.mustReloadWorld = false

    return my
}()
