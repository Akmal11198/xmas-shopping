import { CartItem, User } from "./types";

export const item:CartItem={
    product: {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: "109.95",
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    count: 4,
    userId: 1,
    sale: false
}

export const usersData:User[]=[{
    address: {
        geolocation: {
            lat:" -37.3159",
            long: "81.1496"
        },
        city: "kilcoole",
        street: "new road",
        number: 7682,
        zipcode: "12926-3874"
    },
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "83r5^_",
    phone: "1-570-236-7033",
    name: {
        firstname: "john",
        lastname: "doe"
    }
},
{
    address: {
        geolocation: {
            lat: "-37.3159",
            long: "81.1496"
        },
        city:" kilcoole",
        street: "Lovers Ln",
        number: 7267,
        zipcode: "12926-3874"
    },
    id: 2,
    email: "morrison@gmail.com",
    username: "mor_2314",
    password: "83r5^_",
    name: {
        firstname: "david",
        lastname: "morrison"
    },
    phone: "1-570-236-7033",
}
]