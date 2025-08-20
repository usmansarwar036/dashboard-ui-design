export const seatMap = {
    meta: {
        count: 1,
    },
    data: [
        {
            type: "seatmap",
            flightOfferid: "1",
            segmentid: "1",
            carrierCode: "LH",
            number: "106",
            operating: {
                carrierCode: "EW",
                number: 1001,
            },
            class: "V",
            aircraft: {
                code: "321",
            },
            departure: {
                iataCode: "FRA",
                at: "2019-01-25T13:15:00",
            },
            arrival: {
                iataCode: "MUC",
            },
            decks: [
                {
                    deckType: "MAIN",
                    deckConfiguration: {
                        width: 7,
                        length: 30,
                        startseatRow: 14,
                        endSeatRow: 38,
                        startWingsRow: 14,
                        endWingsRow: 24,
                        startWingsX: 1,
                        endWingsX: 11,
                        exitRowsX: [13, 29],
                    },
                    facilities: [
                        {
                            code: "LA",
                            column: "A",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 28,
                                y: 0,
                            },
                        },
                        {
                            code: "LA",
                            column: "F",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 28,
                                y: 6,
                            },
                        },
                        {
                            code: "GN",
                            column: "A",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 0,
                            },
                        },
                        {
                            code: "GN",
                            column: "B",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 1,
                            },
                        },
                        {
                            code: "GN",
                            column: "C",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 2,
                            },
                        },
                        {
                            code: "GN",
                            column: "C",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 3,
                            },
                        },
                        {
                            code: "GN",
                            column: "D",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 4,
                            },
                        },
                        {
                            code: "GN",
                            column: "E",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 5,
                            },
                        },
                        {
                            code: "GN",
                            column: "F",
                            row: "38",
                            position: "REAR",
                            coordinates: {
                                x: 30,
                                y: 6,
                            },
                        },
                    ],
                    seats: [
                        {
                            cabin: "ECONOMY",
                            number: "14A",
                            characteristicsCodes: ["1", "CH", "LS", "O", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "AVAILABLE",
                                    price: {
                                        currency: "EUR",
                                        total: "25.00",
                                    },
                                },
                            ],
                            coordinates: {
                                x: 1,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "14B",
                            characteristicsCodes: ["1", "9", "CH", "LS", "O", "1A_AQC_PREMIUM_SEAT"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "AVAILABLE",
                                    price: {
                                        currency: "EUR",
                                        total: "25.00",
                                    },
                                },
                            ],
                            coordinates: {
                                x: 1,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "14C",
                            characteristicsCodes: ["1", "A", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "AVAILABLE",
                                    price: {
                                        currency: "EUR",
                                        total: "25.00",
                                    },
                                },
                            ],
                            coordinates: {
                                x: 1,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "14D",
                            characteristicsCodes: ["1", "A", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "AVAILABLE",
                                    price: {
                                        currency: "EUR",
                                        total: "25.00",
                                    },
                                },
                            ],
                            coordinates: {
                                x: 1,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "14E",
                            characteristicsCodes: ["1", "9", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "AVAILABLE",
                                    price: {
                                        currency: "EUR",
                                        total: "25.00",
                                    },
                                },
                            ],
                            coordinates: {
                                x: 1,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "14F",
                            characteristicsCodes: ["1", "CH", "O", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 1,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "15A",
                            characteristicsCodes: ["1", "CH", "LS", "O", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 2,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "15B",
                            characteristicsCodes: ["1", "9", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 2,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "15C",
                            characteristicsCodes: ["1", "A", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 2,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "15D",
                            characteristicsCodes: ["1", "A", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 2,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "15E",
                            characteristicsCodes: ["1", "9", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 2,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "15F",
                            characteristicsCodes: ["1", "CH", "O", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 2,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "16A",
                            characteristicsCodes: ["1", "CH", "LS", "O", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 3,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "16B",
                            characteristicsCodes: ["1", "9", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "AVAILABLE",
                                    price: {
                                        currency: "EUR",
                                        total: "25.00",
                                    },
                                },
                            ],
                            coordinates: {
                                x: 3,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "16C",
                            characteristicsCodes: ["1", "A", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 3,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "16D",
                            characteristicsCodes: ["1", "A", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 3,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "16E",
                            characteristicsCodes: ["1", "9", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 3,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "16F",
                            characteristicsCodes: ["1", "CH", "O", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 3,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "18A",
                            characteristicsCodes: ["1", "1A", "CH", "LS", "O", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 5,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "18B",
                            characteristicsCodes: ["1", "1A", "9", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 5,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "18C",
                            characteristicsCodes: ["1", "1A", "A", "CH", "LS", "O"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 5,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "18D",
                            characteristicsCodes: ["1", "A", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 5,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "18E",
                            characteristicsCodes: ["1", "9", "CH", "O", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 5,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "18F",
                            characteristicsCodes: ["1", "CH", "O", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 5,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "19A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 6,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "19B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 6,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "19C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 6,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "19D",
                            travelerPricing: [
                                {
                                    id: "1",
                                    characteristicsCodes: ["1", "A", "CH", "RS"],
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 6,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "19E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 6,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "19F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 6,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "20A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 7,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "20B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 7,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "20C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 7,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "20D",
                            characteristicsCodes: ["A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "OCCUPIED",
                                },
                            ],
                            coordinates: {
                                x: 7,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "20E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 7,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "20F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 7,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "21A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 8,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "21B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 8,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "21C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 8,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "21D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 8,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "21E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 8,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "21F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 8,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "22A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 9,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "22B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 9,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "22C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 9,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "22D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 9,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "22E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 9,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "22F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 9,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "23A",
                            characteristicsCodes: ["1", "1A", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 10,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "23B",
                            characteristicsCodes: ["1", "1A", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 10,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "23C",
                            characteristicsCodes: ["1", "1A", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 10,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "23D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 10,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "23E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 10,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "23F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 10,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "24A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 11,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "24B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 11,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "24C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 11,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "24D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 11,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "24E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 11,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "24F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 11,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "25B",
                            characteristicsCodes: ["1", "1A", "1D", "9", "CH", "IE", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 12,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "25C",
                            characteristicsCodes: ["1", "1A", "1D", "A", "CH", "IE", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 12,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "25D",
                            characteristicsCodes: ["1", "1A", "1D", "A", "CH", "IE", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 12,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "25E",
                            characteristicsCodes: ["1", "1A", "1D", "9", "CH", "IE", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 12,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "26A",
                            characteristicsCodes: ["1", "1A", "CH", "E", "L", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 13,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "26B",
                            characteristicsCodes: ["1", "1A", "9", "CH", "E", "L", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 13,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "26C",
                            characteristicsCodes: ["1", "1A", "A", "CH", "E", "L", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 13,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "26E",
                            characteristicsCodes: ["1", "1A", "9", "CH", "E", "L", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 13,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "26F",
                            characteristicsCodes: ["1", "1A", "CH", "E", "L", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 13,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "27A",
                            characteristicsCodes: ["1", "1A", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 14,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "27B",
                            characteristicsCodes: ["1", "1A", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 14,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "27C",
                            characteristicsCodes: ["1", "1A", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 14,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "27D",
                            characteristicsCodes: ["1", "1A", "A", "CH", "L", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 14,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "27E",
                            characteristicsCodes: ["1", "1A", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 14,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "27F",
                            characteristicsCodes: ["1", "1A", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 14,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "28A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 15,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "28B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 15,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "28C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 15,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "28D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 15,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "28E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 15,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "28F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 15,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "29A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 16,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "29B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 16,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "29C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 16,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "29D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 16,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "29E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 16,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "29F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 16,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "30A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 17,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "30B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 17,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "30C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 17,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "30D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 17,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "30E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 17,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "30F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 17,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "31A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 18,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "31B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 18,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "31C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 18,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "31D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 18,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "31E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 18,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "31F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 18,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "32A",
                            characteristicsCodes: ["1", "CH", "H", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 19,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "32B",
                            characteristicsCodes: ["1", "9", "CH", "LS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 19,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "32C",
                            characteristicsCodes: ["1", "A", "CH", "LS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 19,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "32D",
                            characteristicsCodes: ["1", "A", "CH", "RS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 19,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "32E",
                            characteristicsCodes: ["1", "9", "CH", "RS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 19,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "32F",
                            characteristicsCodes: ["1", "CH", "H", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 19,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "33A",
                            characteristicsCodes: ["1", "1A", "CH", "H", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 20,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "33B",
                            characteristicsCodes: ["1", "1A", "9", "CH", "LS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 20,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "33C",
                            characteristicsCodes: ["1", "1A", "A", "CH", "LS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 20,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "33D",
                            characteristicsCodes: ["1", "A", "CH", "RS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 20,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "33E",
                            characteristicsCodes: ["1", "9", "CH", "RS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 20,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "33F",
                            characteristicsCodes: ["1", "CH", "H", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 20,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "34A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 21,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "34B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 21,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "34C",
                            characteristicsCodes: ["1", "A", "CH", "LS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 21,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "34D",
                            characteristicsCodes: ["1", "A", "CH", "RS", "U"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 21,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "34E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 21,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "34F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 21,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "35A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 22,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "35B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 22,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "35C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 22,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "35D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 22,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "35E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 22,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "35F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 22,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "36A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 23,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "36B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 23,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "36C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 23,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "36D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 23,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "36E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 23,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "36F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 23,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "37A",
                            characteristicsCodes: ["1", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 24,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "37B",
                            characteristicsCodes: ["1", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 24,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "37C",
                            characteristicsCodes: ["1", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 24,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "37D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 24,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "37E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 24,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "37F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 24,
                                y: 6,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "38A",
                            characteristicsCodes: ["1", "1A", "CH", "LS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 25,
                                y: 0,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "38B",
                            characteristicsCodes: ["1", "1A", "9", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 25,
                                y: 1,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "38C",
                            characteristicsCodes: ["1", "1A", "A", "CH", "LS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 25,
                                y: 2,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "38D",
                            characteristicsCodes: ["1", "A", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 25,
                                y: 4,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "38E",
                            characteristicsCodes: ["1", "9", "CH", "RS"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 25,
                                y: 5,
                            },
                        },
                        {
                            cabin: "ECONOMY",
                            number: "38F",
                            characteristicsCodes: ["1", "CH", "RS", "W"],
                            travelerPricing: [
                                {
                                    id: "1",
                                    seatAvailabilityStatus: "BLOCKED",
                                },
                            ],
                            coordinates: {
                                x: 25,
                                y: 6,
                            },
                        },
                    ],
                },
            ],
            aircraftCabinAmenities: {
                power: {
                    isChargeable: true,
                    powerType: "PLUG",
                },
                seat: {
                    legSpace: 34,
                    spaceUnit: "inches",
                    tilt: "FLAT",
                    medias: [
                        {
                            title: "Lookout points",
                            description: {
                                text: "With 30% bigger windows on our 787 Dreamliner, you'll feel like you have a window seat no matter where you're sitting",
                                lang: "EN",
                            },
                            href: "http://pdt.content.amadeus.com/AncillaryServicesMedia/9203_DFL.gif",
                            mediaType: "image",
                        },
                        {
                            href: "http://pdt.content.amadeus.com/AncillaryServicesMedia/9204_DFL.gif",
                            mediaType: "image",
                        },
                    ],
                },
                wifi: {
                    isChargeable: false,
                    wifiType: "FULL",
                },
                beverage: {
                    isChargeable: false,
                    beverageType: "ALCOHOLIC_AND_NON_ALCOHOLIC",
                },
                entertainment: [
                    {
                        isChargeable: true,
                        entertainmentType: "LIVE_TV",
                    },
                    {
                        isChargeable: true,
                        entertainmentType: "TV_SHOWS",
                    },
                ],
                food: {
                    isChargeable: true,
                    foodType: "MEAL",
                },
            },
        },
    ],
    dictionaries: {
        location: {
            FRA: {
                cityCode: "FRA",
                countryCode: "DE",
            },
            MUC: {
                cityCode: "MUC",
                countryCode: "DE",
            },
        },
        facility: {
            LA: "Lavatory",
            GN: "Galley",
        },
        seatCharacteristic: {
            1: "Restricted seat - General",
            9: "Center seat (not window ,not aisle)",
            A: "Aisle seat",
            RS: "Right side of aircraft",
            CH: "Chargeable seat",
            E: "Exit row seat",
            LS: "Left side of aircraft",
            H: "Seat with facilities for handicapped/incapacitated passenger",
            L: "Leg space seat",
            O: "Preferential seat",
            "1A": "Seat not allowed for infant",
            "1D": "Restricted recline seat",
            U: "Seat suitable for unaccompanied minors",
            W: "Window seat",
            IE: "Seat not suitable for child",
            "1A_AQC_PREMIUM_SEAT": "Premium seat",
        },
    },
    availableSeatsCounters: [
        {
            travelerId: "1",
            value: 2,
        },
    ],
};
