# CharacterForge.ai

[Live Link](https://character-forge-ai.vercel.app/)

CharacterForge.ai is a web application that enables users to generate and customize unique game characters using AI technology. The platform offers an intuitive interface for character creation with various customization options.

## 🚀 Features

- **AI-Powered Character Generation**: Create unique game characters instantly across multiple art styles
- **Multiple Art Styles**: Choose from pixel art, anime, realistic, vector, painterly, cyberpunk, fantasy, and chibi styles
- **Customizable Character Attributes**: Define character class, race, traits, and equipment
- **Interactive 3D Card**: View your character in an interactive 3D card display
- **Collection Generation**: Create character variations with different attributes
- **Wallet Integration**: Connect with Ethereum wallets for future functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Animation**: Framer Motion
- **UI Components**: Radix UI, Shadcn UI
- **Web3 Integration**: Wagmi, Viem, Ethers.js
- **Form Handling**: React Hook Form, Zod
- **Styling**: TailwindCSS, CSS Animations

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MetaMask or another Ethereum wallet (for wallet connection feature)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/character-forge.git
   cd character-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔍 Usage

1. **Connect Wallet**: Connect your Ethereum wallet on the landing page
2. **Generate Characters**: Navigate to the generation page and select your preferred art style, character class, race, and equipment
3. **Customize Attributes**: Adjust character attributes and traits
4. **Preview**: Review your character before generation
5. **Generate Collection**: Create multiple variations of your character

## 🚢 Deployment

The easiest way to deploy your CharacterForge.ai app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [OpenZeppelin](https://openzeppelin.com/) - Smart contract libraries
