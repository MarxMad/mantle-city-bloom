// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BuildingToken is ERC20, Ownable, ReentrancyGuard {
    // Eventos
    event BuildingConstructed(address indexed player, uint256 buildingId, uint256 cost);
    event BuildingUpgraded(address indexed player, uint256 buildingId, uint256 newLevel);
    event BuildingSold(address indexed player, uint256 buildingId, uint256 refund);
    event YieldClaimed(address indexed player, uint256 amount);

    // Estructuras
    struct Building {
        uint256 id;
        string buildingType;
        uint256 level;
        uint256 yieldRate;
        uint256 lastClaimTime;
        bool isActive;
    }

    // Variables de estado
    mapping(address => Building[]) public playerBuildings;
    mapping(uint256 => uint256) public buildingCosts;
    mapping(uint256 => uint256) public buildingYields;
    
    uint256 public constant BASE_YIELD = 10; // Yield base por tick
    uint256 public constant UPGRADE_MULTIPLIER = 150; // 150% del costo base
    uint256 public constant SELL_RETURN_RATE = 70; // 70% del valor al vender
    
    constructor() ERC20("Building Token", "BLD") Ownable(msg.sender) {
        // Mint initial supply to the contract creator
        _mint(msg.sender, 1000000 * 10 ** decimals());
        
        // Inicializar costos base de edificios
        buildingCosts[1] = 100; // DEX
        buildingCosts[2] = 150; // Lending
        buildingCosts[3] = 200; // Stablecoin
        buildingCosts[4] = 250; // NFT Market
        buildingCosts[5] = 300; // Yield Farm
        buildingCosts[6] = 400; // Validator
    }

    // Función para construir un edificio
    function constructBuilding(uint256 buildingType) external nonReentrant {
        require(buildingType > 0 && buildingType <= 6, "Invalid building type");
        uint256 cost = buildingCosts[buildingType];
        require(balanceOf(msg.sender) >= cost, "Insufficient balance");

        // Transferir tokens
        _transfer(msg.sender, address(this), cost);

        // Crear nuevo edificio
        Building memory newBuilding = Building({
            id: playerBuildings[msg.sender].length + 1,
            buildingType: _getBuildingTypeName(buildingType),
            level: 1,
            yieldRate: BASE_YIELD * buildingType,
            lastClaimTime: block.timestamp,
            isActive: true
        });

        playerBuildings[msg.sender].push(newBuilding);

        emit BuildingConstructed(msg.sender, newBuilding.id, cost);
    }

    // Función para mejorar un edificio
    function upgradeBuilding(uint256 buildingId) external nonReentrant {
        require(buildingId > 0 && buildingId <= playerBuildings[msg.sender].length, "Invalid building ID");
        Building storage building = playerBuildings[msg.sender][buildingId - 1];
        require(building.isActive, "Building is not active");

        uint256 upgradeCost = (buildingCosts[_getBuildingTypeId(building.buildingType)] * UPGRADE_MULTIPLIER) / 100;
        require(balanceOf(msg.sender) >= upgradeCost, "Insufficient balance");

        // Transferir tokens
        _transfer(msg.sender, address(this), upgradeCost);

        // Mejorar edificio
        building.level++;
        building.yieldRate = BASE_YIELD * _getBuildingTypeId(building.buildingType) * building.level;

        emit BuildingUpgraded(msg.sender, buildingId, building.level);
    }

    // Función para vender un edificio
    function sellBuilding(uint256 buildingId) external nonReentrant {
        require(buildingId > 0 && buildingId <= playerBuildings[msg.sender].length, "Invalid building ID");
        Building storage building = playerBuildings[msg.sender][buildingId - 1];
        require(building.isActive, "Building is not active");

        uint256 refund = (buildingCosts[_getBuildingTypeId(building.buildingType)] * SELL_RETURN_RATE) / 100;
        
        // Transferir tokens de vuelta al jugador
        _transfer(address(this), msg.sender, refund);

        // Marcar edificio como inactivo
        building.isActive = false;

        emit BuildingSold(msg.sender, buildingId, refund);
    }

    // Función para reclamar yields
    function claimYields() external nonReentrant {
        uint256 totalYield = 0;
        
        for (uint256 i = 0; i < playerBuildings[msg.sender].length; i++) {
            Building storage building = playerBuildings[msg.sender][i];
            if (building.isActive) {
                uint256 timeElapsed = block.timestamp - building.lastClaimTime;
                uint256 yield = (building.yieldRate * timeElapsed) / 1 days;
                totalYield += yield;
                building.lastClaimTime = block.timestamp;
            }
        }

        require(totalYield > 0, "No yields to claim");
        _mint(msg.sender, totalYield);

        emit YieldClaimed(msg.sender, totalYield);
    }

    // Funciones internas
    function _getBuildingTypeName(uint256 typeId) internal pure returns (string memory) {
        if (typeId == 1) return "DEX";
        if (typeId == 2) return "Lending";
        if (typeId == 3) return "Stablecoin";
        if (typeId == 4) return "NFT Market";
        if (typeId == 5) return "Yield Farm";
        if (typeId == 6) return "Validator";
        return "Unknown";
    }

    function _getBuildingTypeId(string memory typeName) internal pure returns (uint256) {
        if (keccak256(bytes(typeName)) == keccak256(bytes("DEX"))) return 1;
        if (keccak256(bytes(typeName)) == keccak256(bytes("Lending"))) return 2;
        if (keccak256(bytes(typeName)) == keccak256(bytes("Stablecoin"))) return 3;
        if (keccak256(bytes(typeName)) == keccak256(bytes("NFT Market"))) return 4;
        if (keccak256(bytes(typeName)) == keccak256(bytes("Yield Farm"))) return 5;
        if (keccak256(bytes(typeName)) == keccak256(bytes("Validator"))) return 6;
        return 0;
    }

    // Función para obtener información de edificios del jugador
    function getPlayerBuildings(address player) external view returns (Building[] memory) {
        return playerBuildings[player];
    }

    // Función para obtener el yield total del jugador
    function getTotalYield(address player) external view returns (uint256) {
        uint256 totalYield = 0;
        for (uint256 i = 0; i < playerBuildings[player].length; i++) {
            Building storage building = playerBuildings[player][i];
            if (building.isActive) {
                uint256 timeElapsed = block.timestamp - building.lastClaimTime;
                totalYield += (building.yieldRate * timeElapsed) / 1 days;
            }
        }
        return totalYield;
    }
} 