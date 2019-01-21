/*

 Copyright 2016 Jeffrey Hullekes

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

var containerTypeProperties = {
    function: {
        drawContainer: true,
        showHeader: true,
        showHeaderText: true,
        showHeaderIcon: false,
        hasFixedHeaderHeight: true,
        headerHeight: 50,
        connectOutgoingTo: "body-right",
        connectIncomingTo: "body-left",
        hasPadding: true,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 200,
        minHeight: 50,
        keepAspectRatio: true,
        aspectRatioAtMaxSize: 1600 / 800,
        childrenFitFunction: "horizontalFromSidesToCenter",
    },
    map: {
        drawContainer: true,
        showHeader: true,
        showHeaderText: true,
        showHeaderIcon: true,
        headerTextCenterHorizontally: false,
        hasFixedHeaderHeight: true,
        headerHeight: 50,
        connectOutgoingTo: "header-right",
        connectIncomingTo: "header-left",
        hasPadding: true,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 50,
        minHeight: 50,
        childrenFitFunction: "verticalTopToBottom",
    },
    keyValue: {
        drawContainer: true,
        showContainerBody: false,
        showContainerIcon: true,
        showContainerText: true,
        showHeader: false,
        containerTextCenterVertically: true,
        containerTextCenterHorizontally: false,
        connectOutgoingTo: "right",
        connectIncomingTo: "left",
        hasPadding: false,
        minWidth: 25,
        minHeight: 25,
        maxHeight: 25,
        childrenFitFunction: "verticalTopToBottom",  // FIXME: is this correct?
    },
    input: {
        drawContainer: false,
        showContainerBody: false,
        showHeader: false,
        hasPadding: false,
        childrenFitFunction: "verticalTopToBottom",
    },
    output: {
        drawContainer: false,
        showContainerBody: false,
        showHeader: false,
        hasPadding: false,
        childrenFitFunction: "verticalTopToBottom",
    },
    body: {
        drawContainer: false,
        showContainerBody: false,
        showHeader: false,
        hasPadding: false,
        childrenFitFunction: "verticalTopToBottom",
    }
}

var connectionTypeProperties = {
    dataFlow: {
    }
}

var reloadWorld = function (world) {

    var mainContainer = {
        containerId: 1,
        containerType: 'function',
        containerData: {
            label: 'convertEpagesOrderToOSOrder'
        },
        children: [
            {
                containerId: 2,
                containerType: 'input',
                children: [
                    {
                        containerId: 3,
                        containerType: 'map',
                        containerData: {
                            label: 'Order'
                        },
                        containerProperties: {
                            headerIconColor: {
                                r: 255,
                                g: 200,
                                b: 200,
                                a: 1.0
                            },
                            headerIconBorderColor: {
                                r: 255,
                                g: 100,
                                b: 100,
                                a: 0.7
                            },
                            headerIconShape: 'triangle_left_bottom'
                        },
                        children: [
                            {
                                containerId: 4,
                                containerType: 'map',
                                containerData: {
                                    label: 'OrderInfo'
                                },
                                containerProperties: {
                                    headerIconColor: {
                                        r: 67,
                                        g: 136,
                                        b: 204,
                                        a: 1.0
                                    },
                                    headerIconBorderColor: {
                                        r: 27,
                                        g: 50,
                                        b: 128,
                                        a: 1.0
                                    },
                                    headerIconShape: 'circle'
                                },
                                children: [
                                    //{
                                    //    containerType: 'map',
                                    //    containerData: {
                                    //        label: 'PersonalMessage',
                                    //        headerIconColor: "rgba(67, 204, 136, 1.0)",
                                    //        headerIconBorderColor: "rgba(27, 128, 50, 1.0)",
                                    //        headerIconShape: 'square'
                                    //    }
                                    //}
                                ]
                            },
                            {
                                containerId: 7,
                                containerType: 'map',
                                containerData: {
                                    label: 'BillingAddress'
                                },
                                containerProperties: {
                                    headerIconColor: {
                                        r: 102,
                                        g: 255,
                                        b: 153,
                                        a: 1.0
                                    },
                                    headerIconBorderColor: {
                                        r: 51,
                                        g: 204,
                                        b: 0,
                                        a: 1.0
                                    },
                                    headerIconShape: 'pentagon_flat_bottom'
                                }
                            }
                        ]
                    }

                ]
            },
            {
                containerId: 8,
                containerType: 'body',
                children: [
                    {
                        containerId: 9,
                        containerType: "function",
                        containerData: {
                            label: 'convertEpagesOrderInfoToOSEssentials'
                        },
                        children: [
                            {
                                containerType: 'input',
                                children: [
                                    {
                                        containerId: 10,
                                        containerType: 'map',
                                        containerData: {
                                            label: 'OrderInfo'
                                        },
                                        containerProperties: {
                                            headerIconColor: {
                                                r: 67,
                                                g: 136,
                                                b: 204,
                                                a: 1.0
                                            },
                                            headerIconBorderColor: {
                                                r: 27,
                                                g: 50,
                                                b: 128,
                                                a: 1.0
                                            },
                                            headerIconShape: 'circle'
                                        },
                                        children: [
                                            //{
                                            //    containerType: 'map',
                                            //    containerData: {
                                            //        label: 'PersonalMessage',
                                            //        headerIconColor: "rgba(67, 204, 136, 1.0)",
                                            //        headerIconBorderColor: "rgba(27, 128, 50, 1.0)",
                                            //        headerIconShape: 'square'
                                            //    }
                                            //}
                                        ]
                                    }
                                ]
                            },
                            {
                                containerId: 11,
                                containerType: 'body',
                                children: []
                            },
                            {
                                containerId: 12,
                                containerType: 'output',
                                children: [
                                    {
                                        containerId: 13,
                                        containerType: 'map',
                                        containerData: {
                                            label: 'osEssentials'
                                        },
                                        containerProperties: {
                                            headerIconColor: {
                                                r: 51,
                                                g: 255,
                                                b: 255,
                                                a: 1.0
                                            },
                                            headerIconBorderColor: {
                                                r: 51,
                                                g: 153,
                                                b: 153,
                                                a: 1.0
                                            },
                                            headerIconShape: 'circle'
                                        },
                                        children: [
                                            {
                                                containerId: 14,
                                                containerType: 'keyValue',
                                                containerData: {
                                                    label: 'orderNo'
                                                },
                                                containerProperties: {
                                                    containerIconColor: {
                                                        r: 102,
                                                        g: 255,
                                                        b: 153,
                                                        a: 1.0
                                                    },
                                                    containerIconBorderColor: {
                                                        r: 51,
                                                        g: 204,
                                                        b: 0,
                                                        a: 1.0
                                                    },
                                                    containerIconShape: 'square'
                                                }
                                            },
                                            {
                                                containerId: 15,
                                                containerType: 'keyValue',
                                                containerData: {
                                                    label: 'externalCreationDate'
                                                },
                                                containerProperties: {
                                                    containerIconColor: {
                                                        r: 150,
                                                        g: 120,
                                                        b: 200,
                                                        a: 1.0
                                                    },
                                                    containerIconBorderColor: {
                                                        r: 120,
                                                        g: 90,
                                                        b: 160,
                                                        a: 1.0
                                                    },
                                                    containerIconShape: 'square'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        containerId: 16,
                        containerType: "function",
                        containerData: {
                            label: 'convertEPagesBillingAddressToOSBilllingAddress'
                        },
                        children: [
                            {
                                containerId: 17,
                                containerType: 'input',
                                children: [
                                    {
                                        containerId: 18,
                                        containerType: 'map',
                                        containerData: {
                                            label: 'BillingAddress'
                                        },
                                        containerProperties: {
                                            headerIconColor: {
                                                r: 102,
                                                g: 255,
                                                b: 153,
                                                a: 1.0
                                            },
                                            headerIconBorderColor: {
                                                r: 51,
                                                g: 204,
                                                b: 0,
                                                a: 1.0
                                            },
                                            headerIconShape: 'pentagon_flat_bottom'
                                        }
                                    }
                                ]
                            },
                            {
                                containerId: 19,
                                containerType: 'body',
                                children: []
                            },
                            {
                                containerId: 20,
                                containerType: 'output',
                                children: [
                                    {
                                        containerId: 21,
                                        containerType: 'map',
                                        containerData: {
                                            label: 'billingAddress'
                                        },
                                        containerProperties: {
                                            headerIconColor: {
                                                r: 255,
                                                g: 200,
                                                b: 200,
                                                a: 1.0
                                            },
                                            headerIconBorderColor: {
                                                r: 255,
                                                g: 100,
                                                b: 100,
                                                a: 0.7
                                            },
                                            headerIconShape: 'diamond'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                containerId: 22,
                containerType: 'output',
                children: [
                    {
                        containerId: 23,
                        containerType: 'map',
                        containerData: {
                            label: 'order'
                        },
                        containerProperties: {
                            headerIconColor: {
                                r: 67,
                                g: 136,
                                b: 204,
                                a: 1.0
                            },
                            headerIconBorderColor: {
                                r: 27,
                                g: 50,
                                b: 128,
                                a: 1.0
                            },
                            headerIconShape: 'square'
                        },
                        children: [
                            {
                                containerId: 24,
                                containerType: 'keyValue',
                                containerData: {
                                    label: 'orderNo'
                                },
                                containerProperties: {
                                    containerIconColor: {
                                        r: 102,
                                        g: 255,
                                        b: 153,
                                        a: 1.0
                                    },
                                    containerIconBorderColor: {
                                        r: 51,
                                        g: 204,
                                        b: 0,
                                        a: 1.0
                                    },
                                    containerIconShape: 'square'
                                }
                            },
                            {
                                containerId: 25,
                                containerType: 'keyValue',
                                containerData: {
                                    label: 'externalCreationDate'
                                },
                                containerProperties: {
                                    containerIconColor: {
                                        r: 150,
                                        g: 120,
                                        b: 200,
                                        a: 1.0
                                    },
                                    containerIconBorderColor: {
                                        r: 120,
                                        g: 90,
                                        b: 160,
                                        a: 1.0
                                    },
                                    containerIconShape: 'square'
                                }
                            },
                            {
                                containerId: 26,
                                containerType: 'map',
                                containerData: {
                                    label: 'billingAddress'
                                },
                                containerProperties: {
                                    headerIconColor: {
                                        r: 255,
                                        g: 200,
                                        b: 200,
                                        a: 1.0
                                    },
                                    headerIconBorderColor: {
                                        r: 255,
                                        g: 100,
                                        b: 100,
                                        a: 0.7
                                    },
                                    headerIconShape: 'diamond'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var connections = [
            {
                from: 7,
                to: 18,
                type: "dataFlow"
            },
            {
                from: 4,
                to: 10,
                type: "dataFlow"
            },
            {
                from: 21,
                to: 26,
                type: "dataFlow"
            },
            {
                from: 14,
                to: 24,
                type: "dataFlow"
            },
            {
                from: 15,
                to: 25,
                type: "dataFlow"
            }
        ]
        ;


    var addContainersToWorld = function (world, parentWorldContainer, container) {

        var overrulingContainerProperties = container.containerProperties

        var worldContainer = ZUI.addWorldContainer(world, parentWorldContainer, container.containerId, container.containerType, overrulingContainerProperties)

        if (container.containerData != null) {
            worldContainer.containerData.label = container.containerData.label
        }

        if (container.hasOwnProperty('children')) {
            for (var loopIndex = 0; loopIndex < container.children.length; loopIndex++) {
                var childContainer = container.children[loopIndex]
                addContainersToWorld(world, worldContainer, childContainer)
            }
        }
    }

    ZUI.clearWorldContent(world)

    addContainersToWorld(world, null, mainContainer)

    for (loopIndex = 0; loopIndex < connections.length; loopIndex++) {
        var connection = connections[loopIndex]

        ZUI.addWorldConnection(world, connection.from, connection.to, connection.type)
    }

}

var sliceContainerWasMoved = function (movedSliceContainer) {
    // console.log(movedContainer)
}

var sliceContainerWasSelected = function (selectedSliceContainer) {
    // console.log(selectedSliceContainer)
}

// TODO: guides for debugging
//  ZUI.main.doDrawGuides = true

var flowWorld = ZUI.world.createNewWorld()
ZUI.setContainerTypeProperties(flowWorld, containerTypeProperties)
ZUI.setConnectionTypeProperties(flowWorld, connectionTypeProperties)
ZUI.setReloadWorldFunction(flowWorld, reloadWorld)
ZUI.setContainerHasMovedOutputListener(flowWorld, sliceContainerWasMoved)
ZUI.setContainerWasSelectedOutputListener(flowWorld, sliceContainerWasSelected)

ZUI.configureInterface(
    {
        worlds: {
            main: flowWorld
        }
    }
)
ZUI.addInputListeners()
ZUI.start()


