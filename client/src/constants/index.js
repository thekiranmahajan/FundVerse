import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "Payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "Withdraw",
    imgUrl: withdraw,
    link: "/withdraw",
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "Logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];

export const contractAbi = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Action",
    inputs: [
      {
        type: "uint256",
        name: "id",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "string",
        name: "actionType",
        indexed: false,
        internalType: "string",
      },
      {
        type: "address",
        name: "executor",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "campaigns",
    inputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "string",
        name: "name",
        internalType: "string",
      },
      {
        type: "string",
        name: "category",
        internalType: "string",
      },
      {
        type: "string",
        name: "title",
        internalType: "string",
      },
      {
        type: "string",
        name: "description",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "target",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountCollected",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "image",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createCampaign",
    inputs: [
      {
        type: "string",
        name: "_name",
        internalType: "string",
      },
      {
        type: "string",
        name: "_title",
        internalType: "string",
      },
      {
        type: "string",
        name: "_category",
        internalType: "string",
      },
      {
        type: "string",
        name: "_description",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "_target",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_deadline",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "_image",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deleteCampaign",
    inputs: [
      {
        type: "uint256",
        name: "_id",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "donateToCampaign",
    inputs: [
      {
        type: "uint256",
        name: "_id",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getCampaigns",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "address",
            name: "owner",
            internalType: "address",
          },
          {
            type: "string",
            name: "name",
            internalType: "string",
          },
          {
            type: "string",
            name: "category",
            internalType: "string",
          },
          {
            type: "string",
            name: "title",
            internalType: "string",
          },
          {
            type: "string",
            name: "description",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "target",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "deadline",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "amountCollected",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "image",
            internalType: "string",
          },
          {
            type: "address[]",
            name: "donators",
            internalType: "address[]",
          },
          {
            type: "uint256[]",
            name: "donations",
            internalType: "uint256[]",
          },
        ],
        internalType: "struct CrowdFunding.Campaign[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDonators",
    inputs: [
      {
        type: "uint256",
        name: "_id",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address[]",
        name: "",
        internalType: "address[]",
      },
      {
        type: "uint256[]",
        name: "",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "manager",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "numberOfCampaigns",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "updateCampaign",
    inputs: [
      {
        type: "uint256",
        name: "_id",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "_name",
        internalType: "string",
      },
      {
        type: "string",
        name: "_title",
        internalType: "string",
      },
      {
        type: "string",
        name: "_category",
        internalType: "string",
      },
      {
        type: "string",
        name: "_description",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "_target",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_deadline",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "_image",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
];
