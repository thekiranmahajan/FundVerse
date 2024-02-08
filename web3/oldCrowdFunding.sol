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
    uint256 public platformFee;

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint) balances;
    uint256 public numberOfCampaigns;

    constructor(uint256 _platformFee) payable {
        manager == msg.sender;
        platformFee = _platformFee;
        balances[msg.sender] = msg.value;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "not owner");
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
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // check that the dealine is in the future
        require(
            campaign.deadline < block.timestamp,
            "deadline should be a date in the future"
        );

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

        // make sure the inputs can't be null
        if (
            (bytes(_title).length <= 0 &&
                bytes(_description).length <= 0 &&
                _target <= 0 &&
                _deadline <= 0 &&
                bytes(_image).length <= 0)
        ) {
            revert InputsCantBeNull();
        }

        if (block.timestamp > _deadline) {
            revert DeadlineShouldBeInFuture();
        }

        require(campaign.owner > address(0), "No campaign exist with this ID");

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

        Campaign storage campaign = campaigns[_id];

        // amount donated shouldn't be zero or less
        if (amount <= 0 wei) {
            revert AmountDonatedMustBeGreaterThanZero({
                minAmount: 1 wei,
                donatedAmount: amount
            });
        }

        // cannot donate after deadline
        if (campaign.deadline < block.timestamp) {
            revert DeadlineReached({
                campaignDeadline: campaigns[_id].deadline,
                timeRequested: block.timestamp
            });
        }

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(address(this)).call{value: amount}("");
        require(sent, "donation failed");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function deleteCampaign(
        uint256 _id
    ) public authorisedPerson(_id) returns (bool) {
        if (campaigns[_id].owner == address(0)) {
            revert CrowdFunding__CampaignDoesNotExist();
        }

        // refund the donators if any
        if (campaigns[_id].amountCollected > 0) {
            _refundDonators(_id);
        }

        delete campaigns[_id];

        numberOfCampaigns = numberOfCampaigns - 1;

        emit Action(_id, "Campaign Deleted", msg.sender, block.timestamp);

        return (true);
    }

    function _refundDonators(uint _id) public {
        Campaign storage campaign = campaigns[_id];
        for (uint i; i < campaign.donators.length; i++) {
            address donators = campaign.donators[i];
            uint256 donations = campaign.donations[i];

            // setting values to zero before withdrawing for security purposes (WITHDRAWAL PATTERN)
            campaign.donations[i] = 0;
            campaign.amountCollected = 0;

            _payTo(donators, donations);
        }
    }

    // platform fee
    function calculatePlatformFee(
        uint256 _id
    ) public view returns (uint, uint) {
        require(campaigns[_id].amountCollected > 0, "no donations collected");
        uint raisedAmount = campaigns[_id].amountCollected;
        uint fee = (raisedAmount * platformFee) / 100;
        return (raisedAmount, fee);
    }

    // withdraw donations
    function withdrawDonations(
        uint256 _id
    ) public authorisedPerson(_id) returns (bool) {
        (uint raisedAmount, uint256 fee) = calculatePlatformFee(_id);
        address platformAddress = 0x13A19933267ec307c96f3dE8Ff8A2392C39263EB;

        //balances[msg.sender] = 0; // updating adress balance before atually withdrawing

        //send to campaign owner
        require(
            (raisedAmount - fee) <= (address(this).balance),
            "amount in excess of balance"
        );
        _payTo(campaigns[_id].owner, (raisedAmount - fee));

        //send to platform
        require(fee <= (address(this).balance), "fee in excess of balance");
        _payTo(platformAddress, fee);

        emit Action(_id, "Funds Withdrawn", msg.sender, block.timestamp);

        return true;
    }

    function _payTo(address to, uint256 amount) internal {
        require(amount > 0, "Can't send 0");
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "transfer failed");
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        // create an empty array of as many structs as there are campaigns
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        // now we loop through the campaigns and populate the variable
        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}