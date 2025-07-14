export interface VideoRowProps {
  drop: Drop;
}

export interface Drop {
  dropUri: string;
  dropMetadata: {
    title: string;
    cover: string;
  };
  collections: Collection[];
}

export interface Collection {
  uri: string;
  tokensSold: number;
  edition: string;
  hasCollected: boolean;
  metadata: {
    title: string;
    cover: string;
    video: string;
    description: string;
    config: {
      model: string;
      workflow: string;
      prompt: string;
      hardware: string;
    };
  };
  dropUri: string;
  dropMetadata: {
    title: string;
    cover: string;
  };
  prices: string[];
  collectionId: string;
  acceptedTokens: string[];
}

export interface Order {
  buyer: string;
  collection: Collection;
  currency: string;
  amount: string;
  transactionHash: string;
}
