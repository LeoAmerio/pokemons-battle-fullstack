import { useQuery, useMutation, QueryClient } from "react-query";
import { BattleResult, Pokemon } from "../interfaces/interfaces";
import axios from "axios";

interface FetchPokemonsResponse {
  fetchPokemons: () => Promise<Pokemon[]>;
}

export const useGetPokemons = ({ fetchPokemons }: FetchPokemonsResponse) => {
  const {
    data: pokemons,
    isLoading,
    isError,
  } = useQuery(["pokemons"], fetchPokemons);

  return { pokemons, isLoading, isError };
};

interface MutationsProps {
  queryClient: QueryClient;
  pokemon1Id?: string;
  pokemon2Id?: string;
}

// Mutación para iniciar una batalla
export const useBattleMutation = ({
  queryClient,
}: MutationsProps) => {
  const battleMutation = useMutation(
    ({ pokemon1Id, pokemon2Id }: { pokemon1Id: string; pokemon2Id: string }) =>
      startBattle(pokemon1Id, pokemon2Id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["battleResults"] });
      },
    }
  );

  return { battleMutation };
};

const startBattle = async (
  pokemon1Id: string,
  pokemon2Id: string
): Promise<BattleResult> => {
  const response = await axios.post<BattleResult>(
    "http://localhost:5000/battle",
    {
      pokemon1Id,
      pokemon2Id,
    }
  );
  return response.data;
};
