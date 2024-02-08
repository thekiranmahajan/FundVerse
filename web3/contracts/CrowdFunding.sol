// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract CrowdFunding {
    struct Campaign {
        address owner;
        string name;
        string category;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    address public manager;

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Not owner");
        _;
    }

    modifier authorisedPerson(uint _id) {
        require(msg.sender == campaigns[_id].owner, "Not Authorised");
        _;
    }

    function createCampaign(
        address _owner,
        string memory _name,
        string memory _title,
        string memory _category,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline should be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.name = _name;
        campaign.title = _title;
        campaign.category = _category;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        emit Action(numberOfCampaigns - 1, "Campaign created", msg.sender, block.timestamp);

        return numberOfCampaigns - 1;
    }

    function updateCampaign(
        uint256 _id,
        string memory _name,
        string memory _title,
        string memory _category,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public authorisedPerson(_id) returns (bool) {
        require(_deadline > block.timestamp, "Deadline should be in the future");
        
        Campaign storage campaign = campaigns[_id];

        campaign.name = _name;
        campaign.title = _title;
        campaign.category = _category;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        emit Action(_id, "Campaign updated", msg.sender, block.timestamp);

        return true;
    }

    function deleteCampaign(uint256 _id) public authorisedPerson(_id) returns (bool) {
        require(campaigns[_id].owner != address(0), "Campaign does not exist");

        delete campaigns[_id];

        emit Action(_id, "Campaign deleted", msg.sender, block.timestamp);

        return true;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(msg.value > 0, "Amount donated must be greater than zero");
        require(campaigns[_id].deadline > block.timestamp, "Deadline reached");

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        emit Action(_id, "Donation received", msg.sender, block.timestamp);
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
