// Install ----->   npm i apollo-server-express@2.23.0 -f
//Link to open ------->     http://localhost:8082/graphql

const express = require('express');
const { ApolloServer, gql, UserInputError } = require('apollo-server-express');
const { application } = require('express');

let students = [
    {
        name: "Student 1",
        dept: "CSE",
        cgpa: 9.4,
        street: "abcd",
        city: "vij",
        ph: "9999988888"
    },
    {
        name: "Student 2",
        dept: "CSE",
        cgpa: 8.6,
        street: "efgh",
        city: "hyd"
    }
];

// name: String!  ---->  here ! is there because it is manidatory but for ---> ph: String ----> ! is not there so without entering phone number also it works fine 
// but without entering name or dept or cgpa it throws an error*****
const typeDefs = gql`
    type Student {
        name: String!, 
        dept: String!,
        cgpa: Float!,
        address: Address!,
        ph: String
    }

    type Address{
        street: String!,
        city: String!
    }

    type Mutation {
        addStudent(
            name: String!,
            dept: String!,
            cgpa: Float!,
            street: String!,
            city: String!,
            ph: String
        ): Student
    }

    type Query {
        allStudent: [Student]! 
        studentCount: Int!
        findStudent(name: String!): Student
    }
`

const resolvers = {
    Query: {
        allStudent: () => students,
        studentCount: () => students.length,
        findStudent: (root, args) =>
            students.find(s => s.name === args.name)
    },

    Student: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },

    Mutation: {
        addStudent: (root, args) => {

            if(students.find(s => s.name === args.name)){
                throw new UserInputError('Name must be Unique', {
                    invalidArgs: args.name
                })
            }

            const student = {...args}
            students = students.concat(student)
            return student
        }
    }
}

var server = new ApolloServer({typeDefs, resolvers});
var app = express();

server.applyMiddleware({app});
//applyMiddleware-->medium or bridge to connect server and graphql

app.listen(8084);
console.log("Server Started");





// # query{
//     #   allStudent{
//     #     name,
//     #     dept,
//     #     cgpa,
//     #     address{
//     #       city,
//     #       street
//     #     },
//     #     ph
//     #   },
//     #   findStudent(name:"Student 2"){
//     #     name,
//     #     dept,
//     #     cgpa,
//     #     address{
//     #       city,
//     #       street
//     #     }
//     #   },
//     #   studentCount
//     # }
    
//     mutation{
//       addStudent(name:"Likith 1",
//         dept: "CSE",
//         cgpa: 9.59,
//         street: "xyz",
//         city: "vizag",
//         ph: "9876543")
//       {
//          name,
//         dept,
//         cgpa,
//         address{
//           city,
//           street
//         },
//         ph
//       }
//     }
    