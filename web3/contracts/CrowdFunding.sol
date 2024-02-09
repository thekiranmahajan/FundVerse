// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Errors
error CrowdFunding__CampaignDoesNotExist();
error InputsCantBeNull();
error DeadlineShouldBeInFuture();
error AmountDonatedMustBeGreaterThanZero(uint minAmount, uint donatedAmount);
error DeadlineReached(uint campaignDeadline, uint timeRequested);

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
        require(_deadline > block.timestamp * 1000, "Deadline should be in the future");

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
        Campaign storage campaign = campaigns[_id];

        require(_deadline > block.timestamp * 1000, "Deadline should be in the future");
        require(_target > 0, "Target amount must be greater than zero");
        require(campaign.owner != address(0), "Campaign does not exist");

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

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        require(amount > 0, "Amount donated must be greater than zero");

        Campaign storage campaign = campaigns[_id];

        require(campaign.deadline > block.timestamp * 1000, "Deadline reached");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount;
    }

    function deleteCampaign(
        uint256 _id
    ) public authorisedPerson(_id) returns (bool) {
        Campaign storage campaign = campaigns[_id];

        require(campaign.owner != address(0), "Campaign does not exist");

        if (campaign.amountCollected > 0) {
            _refundDonators(_id);
        }

        delete campaigns[_id];

        numberOfCampaigns--;

        emit Action(_id, "Campaign Deleted", msg.sender, block.timestamp);

        return true;
    }

    function _refundDonators(uint _id) internal {
        Campaign storage campaign = campaigns[_id];
        for (uint i = 0; i < campaign.donators.length; i++) {
            address donator = campaign.donators[i];
            uint256 donationAmount = campaign.donations[i];

            campaign.donations[i] = 0;
            campaign.amountCollected = 0;

            _payTo(donator, donationAmount);
        }
    }

    function withdrawDonations(
        uint256 _id
    ) public authorisedPerson(_id) returns (bool) {
        Campaign storage campaign = campaigns[_id];

        require(campaign.amountCollected <= address(this).balance, "Insufficient contract balance");

        _payTo(campaign.owner, campaign.amountCollected);

            campaign.amountCollected = 0;

        emit Action(_id, "Funds Withdrawn", msg.sender, block.timestamp);

        return true;
    }

    function _payTo(address to, uint256 amount) internal {
        require(amount > 0, "Can't send 0");
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Transfer failed");
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
