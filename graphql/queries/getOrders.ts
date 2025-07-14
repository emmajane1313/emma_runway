import { emancipaClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const ORDERS = gql`
  query ($buyer: String!) {
    orderCreateds(where: { buyer: $buyer }, first: 1000) {
      collection {
        collectionId
      }
    }
  }
`;

export const getOrders = async (buyer: string): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = emancipaClient.query({
    query: ORDERS,
    variables: {
      buyer,
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000);
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);

  timeoutId && clearTimeout(timeoutId);

  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};
