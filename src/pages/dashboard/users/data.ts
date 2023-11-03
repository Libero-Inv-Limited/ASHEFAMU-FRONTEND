export const data: UserData[] = [
  {
    user: {
      id: 1,
      email: "user1@example.com",
      mobile_number: "123-456-7890",
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      role: 1,
      last_login: "2023-11-01",
      verifiedContacts: {
        id: 1,
        email_verification_status: "verified",
        mobile_verification_status: "verified",
        user_id: 1,
      },
      userRole: {
        id: 1,
        role: 1,
        user_id: 1,
        roleDetails: [
          { name: "Admin", id: 1 },
          { name: "User", id: 2 },
        ],
      },
    },
    permissions: [],
  },
  {
    user: {
      id: 2,
      email: "user2@example.com",
      mobile_number: "987-654-3210",
      firstname: "Jane",
      lastname: "Smith",
      username: "janesmith",
      role: 2,
      last_login: "2023-11-01",
      verifiedContacts: {
        id: 2,
        email_verification_status: "verified",
        mobile_verification_status: "verified",
        user_id: 2,
      },
      userRole: {
        id: 2,
        role: 2,
        user_id: 2,
        roleDetails: [
          { name: "User", id: 2 },
        ],
      },
    },
    permissions: [],
  },
  {
    user: {
      id: 3,
      email: "user3@example.com",
      mobile_number: "555-555-5555",
      firstname: "Alice",
      lastname: "Johnson",
      username: "alicej",
      role: 3,
      last_login: "2023-11-01",
      verifiedContacts: {
        id: 3,
        email_verification_status: "verified",
        mobile_verification_status: "verified",
        user_id: 3,
      },
      userRole: {
        id: 3,
        role: 3,
        user_id: 3,
        roleDetails: [
          { name: "User", id: 2 },
        ],
      },
    },
    permissions: [],
  },
  {
    user: {
      id: 4,
      email: "user4@example.com",
      mobile_number: "111-222-3333",
      firstname: "Bob",
      lastname: "Williams",
      username: "bobw",
      role: 1,
      last_login: "2023-11-01",
      verifiedContacts: {
        id: 4,
        email_verification_status: "verified",
        mobile_verification_status: "verified",
        user_id: 4,
      },
      userRole: {
        id: 4,
        role: 1,
        user_id: 4,
        roleDetails: [
          { name: "Admin", id: 1 },
          { name: "User", id: 2 },
        ],
      },
    },
    permissions: [],
  },
  {
    user: {
      id: 5,
      email: "user5@example.com",
      mobile_number: "777-888-9999",
      firstname: "Ella",
      lastname: "Brown",
      username: "ellab",
      role: 2,
      last_login: "2023-11-01",
      verifiedContacts: {
        id: 5,
        email_verification_status: "verified",
        mobile_verification_status: "verified",
        user_id: 5,
      },
      userRole: {
        id: 5,
        role: 2,
        user_id: 5,
        roleDetails: [
          { name: "User", id: 2 },
        ],
      },
    },
    permissions: [],
  },
  // You can continue adding more data objects to the array as needed.
];
