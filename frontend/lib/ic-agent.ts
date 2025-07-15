import { HttpAgent, Actor, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { IDL } from "@dfinity/candid";

// Internet Computer host URL
export const IC_HOST = process.env.NEXT_PUBLIC_IC_HOST || "https://ic0.app";

// Create an HTTP agent for interacting with the Internet Computer
export const createAgent = async (identity?: Identity) => {
  const agent = new HttpAgent({
    host: IC_HOST,
    identity,
  });

  // Fetch root key for local development
  if (process.env.NODE_ENV === "development") {
    try {
      await agent.fetchRootKey();
    } catch {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
    }
  }

  return agent;
};

// Create an authenticated agent using the current identity
export const createAuthenticatedAgent = async () => {
  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();

  return createAgent(identity);
};

// Generic function to create an actor with a given canister ID and IDL
export const createActor = (
  canisterId: string,
  idl: IDL.InterfaceFactory,
  identity?: Identity
) => {
  const agent = new HttpAgent({
    host: IC_HOST,
    identity,
  });

  if (process.env.NODE_ENV === "development") {
    agent.fetchRootKey().catch(() => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
    });
  }

  return Actor.createActor(idl, {
    agent,
    canisterId,
  });
};
