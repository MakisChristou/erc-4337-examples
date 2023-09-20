export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];


export const SIMPLE_ACCOUNT_ABI = [
  // Read-Only Functions
  "function owner() view returns (address)",
  "function entryPoint() view returns (address)",

  // New Functions
  "function deposit(uint256 amount) public",
  "function withdrawAll() public",

  // Authenticated Functions
  "function execute(address dest, uint256 value, bytes calldata func) external",
  "function executeBatch(address[] calldata dest, bytes[] calldata func) external",
  "function initialize(address anOwner) public",

  // Events
  "event SimpleAccountInitialized(address indexed entryPoint, address indexed owner)"
];

