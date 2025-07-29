# MOTIV - Web3 Community Platform

## Project Overview

MOTIV is a comprehensive Web3-based community platform that integrates blockchain technology with traditional social features. The platform provides community management, AI-powered consultation, real-time chat, and anonymous note systems, all while ensuring data transparency and immutability through IPFS (InterPlanetary File System) and ICP (Internet Computer Protocol) integration.

### Key Features
- **Community Management**: Create, read, update, and delete posts with comments and reactions
- **AI Consultation**: Intelligent agent system for user guidance and support
- **Real-time Chat**: Secure messaging with blockchain-based data verification
- **Anonymous Notes**: Privacy-focused anonymous communication system
- **Web3 Authentication**: Wallet-based authentication using digital signatures
- **Blockchain Integration**: IPFS for decentralized storage and ICP for transaction recording

---

## Project Structure

```
motiv/
├── backend/                    # FastAPI-based backend server
│   ├── app/
│   │   ├── routers/           # API route handlers (community, chat, agent, anonymous_note, auth)
│   │   ├── api/endpoints/     # Detailed endpoint implementations
│   │   ├── core/              # Core modules (authentication, IPFS, ICP, logging)
│   │   ├── models/            # Database ORM models
│   │   ├── schemas/           # Pydantic data validation schemas
│   │   ├── crud/              # Database CRUD operations
│   │   └── database.py        # Database connection configuration
│   ├── contracts/             # Solidity smart contracts
│   │   ├── IpfsStorage.sol    # IPFS hash storage contract
│   │   └── README.md          # Smart contract documentation
│   └── requirements.txt       # Python dependencies
├── frontend/                  # Next.js-based frontend application
│   ├── app/                   # Next.js app directory (pages and routing)
│   ├── components/            # Reusable UI components
│   ├── context/               # React context for state management
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries and configurations
│   ├── public/                # Static assets
│   ├── animations/            # Animation configurations
│   └── package.json           # Node.js dependencies and scripts
└── README.md                  # This file
```

---

## Frontend (Next.js)

### Technology Stack
- **Framework**: Next.js 15.3.5 with App Router
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Blockchain Integration**: Dfinity SDK (@dfinity/agent, @dfinity/auth-client)
- **Animations**: Framer Motion, Lottie React
- **Development**: TypeScript, ESLint, Prettier

### Getting Started

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   # or
   pnpm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Access Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Key Dependencies
- `@dfinity/agent`: ICP blockchain interaction
- `@dfinity/auth-client`: Web3 authentication
- `@dfinity/identity`: Identity management
- `framer-motion`: Smooth animations
- `lottie-react`: Lottie animation support
- `lucide-react`: Icon library
- `tailwindcss`: Utility-first CSS framework

### Features
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Web3 Integration**: Seamless blockchain wallet connection
- **Real-time Updates**: Live data synchronization
- **Component Library**: Reusable UI components with Radix UI
- **Type Safety**: Full TypeScript implementation

---

## Backend (FastAPI)

### Technology Stack
- **Framework**: FastAPI
- **Database**: SQLAlchemy ORM
- **Data Validation**: Pydantic
- **Blockchain Integration**: IPFS and ICP APIs
- **Authentication**: JWT with digital signature verification
- **Server**: Uvicorn ASGI server

### Getting Started

1. **Install Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run Development Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Access API Documentation**:
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Core Dependencies
- `fastapi`: Modern web framework for building APIs
- `uvicorn`: ASGI server implementation
- `sqlalchemy`: Database ORM
- `pydantic`: Data validation using Python type annotations

### Architecture
- **Modular Design**: Separated routers for different features
- **Middleware Integration**: CORS, authentication, logging
- **Error Handling**: Comprehensive error management
- **Data Validation**: Request/response validation with Pydantic
- **Blockchain Integration**: IPFS upload and ICP transaction recording

---

## API Endpoints Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Web3 wallet signature-based authentication |

**Request Body**:
```json
{
  "wallet_address": "string",
  "signature": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "access_token": "string",
  "token_type": "bearer",
  "wallet_address": "string"
}
```

### Community Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/community/posts` | Create a new community post |
| `GET` | `/community/posts` | Retrieve paginated list of posts |
| `GET` | `/community/posts/{post_id}` | Get specific post details |
| `PUT` | `/community/posts/{post_id}` | Update existing post |
| `DELETE` | `/community/posts/{post_id}` | Delete post |
| `POST` | `/community/posts/{post_id}/like` | Like/unlike a post |
| `POST` | `/community/posts/{post_id}/comments` | Add comment to post |
| `GET` | `/community/posts/{post_id}/comments` | Get post comments |
| `PUT` | `/community/comments/{comment_id}` | Update comment |
| `DELETE` | `/community/comments/{comment_id}` | Delete comment |
| `POST` | `/community/comments/{comment_id}/like` | Like/unlike comment |

### Chat System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chat/start` | Initialize chat session with user info |
| `POST` | `/chat/message` | Send chat message |
| `GET` | `/chat/history` | Retrieve chat history for user |

### AI Consultation
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/agent/ask` | Submit consultation request to AI agent |

### Anonymous Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/anonymous_note/send` | Send anonymous note |
| `GET` | `/anonymous_note/recent` | Get recent anonymous notes |
| `POST` | `/anonymous_note/{note_id}/reply` | Reply to anonymous note |
| `POST` | `/anonymous_note/{note_id}/react` | React to anonymous note |

---

## Smart Contracts

### Location
All smart contracts are located in the `backend/contracts/` directory.

### IpfsStorage.sol
A Solidity smart contract for storing and managing IPFS hashes on the Ethereum blockchain.

**Key Functions**:
- `addFile(string memory _ipfsHash)`: Add new IPFS hash to blockchain
- `getFile(uint256 _fileId)`: Retrieve file information by ID

**Contract Features**:
- Immutable IPFS hash storage
- Timestamp recording for each file
- Event emission for blockchain transparency
- Gas-efficient operations

**Usage Example**:
```solidity
// Add file to IPFS storage
ipfsStorage.addFile("QmHash...");

// Retrieve file information
(string memory hash, uint256 timestamp) = ipfsStorage.getFile(1);
```

---

## Blockchain Integration

### IPFS (InterPlanetary File System)
- **Purpose**: Decentralized file storage for data immutability
- **Integration**: All user-generated content is hashed and stored on IPFS
- **Benefits**: Content addressing, censorship resistance, data integrity

### ICP (Internet Computer Protocol)
- **Purpose**: Blockchain-based transaction recording
- **Integration**: IPFS hashes are recorded as transactions on ICP
- **Benefits**: Transparent audit trail, decentralized verification

### Web3 Authentication
- **Method**: Digital signature verification using wallet addresses
- **Security**: Cryptographic proof of ownership
- **Implementation**: JWT tokens issued after signature validation

---

## Development Guidelines

### Code Style
- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black code formatter (recommended)
- **Smart Contracts**: Solidity style guide compliance

### Testing
- **Frontend**: Jest + React Testing Library
- **Backend**: Pytest for API testing
- **Smart Contracts**: Hardhat testing framework

### Deployment
- **Frontend**: Vercel (recommended) or any static hosting
- **Backend**: Docker containers with cloud providers
- **Smart Contracts**: Ethereum mainnet/testnet deployment

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
1. Clone the repository
2. Set up both frontend and backend environments
3. Configure blockchain network connections
4. Run tests to ensure everything works
5. Start development servers

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the API documentation at `/docs` endpoint
- Review the smart contract documentation in `backend/contracts/`

---

## Roadmap

- [ ] Enhanced AI consultation features
- [ ] Mobile application development
- [ ] Advanced blockchain integration
- [ ] Community governance features
- [ ] Cross-chain compatibility
- [ ] Advanced analytics and insights