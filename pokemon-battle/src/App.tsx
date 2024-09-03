import { useState } from 'react'
import './App.css'
import { Pokemon } from './interfaces/interfaces';
import { Box, Typography, Grid, CardMedia, CardContent, Button, styled, Card } from '@mui/material';
import PokemonCard from './pokemons/PokemonCard';
// import { useQueryClient } from 'react-query';
import { useGetPokemons } from './hooks/useBattle';
import axios from 'axios';

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await axios.get<Pokemon[]>('http://localhost:5000/pokemon');
  return response.data;
};

interface StyledCardProps {
  isSelected: boolean;
  isOpponent: boolean;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isOpponent',
})<StyledCardProps>(({ theme, isSelected, isOpponent }) => ({
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[10],
  },
  border: isSelected
    ? isOpponent
      ? '5px solid red'
      : '5px solid green'
    : 'none',
}));

const pokemonData: Pokemon[] = [
  { 'id': "pokemon-1", name: 'Pikachu', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png', hp: 80, attack: 70, defense: 40, speed: 90 },
  { 'id': "pokemon-2", name: 'Charmander', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png', hp: 70, attack: 60, defense: 50, speed: 65 },
  { 'id': "pokemon-3", name: 'Squirtle', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png', hp: 75, attack: 55, defense: 80, speed: 60 },
  { 'id': "pokemon-4", name: 'Bulbasaur', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png', hp: 85, attack: 65, defense: 70, speed: 55 },
  { 'id': "pokemon-5", name: 'Eevee', imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png', hp: 70, attack: 60, defense: 60, speed: 70 },
];

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  console.log('selectedPokemon ', selectedPokemon);
  const [opponent, setOpponent] = useState<Pokemon | null>(null);
  console.log('selectedPokemon ', opponent);
  // const queryClient = useQueryClient();
  // const [battleResult, setBattleResult] = useState<string>('');
  const { pokemons } = useGetPokemons({ fetchPokemons });	
  console.log('pokemons ', pokemons);
  // const { battleMutation } = useBattleMutation({ queryClient });

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemon && selectedPokemon.id !== pokemon.id) {
      setOpponent(pokemon);
    } else {
      setSelectedPokemon(pokemon);
      setOpponent(null);
    }
  };

  // useEffect(() => {
  //   if (selectedPokemon && opponent) {
  //     battleMutation.mutate({ pokemon1Id: selectedPokemon.id, pokemon2Id: opponent.id });
  //   }
  // }, [battleMutation]);

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Battle of Pokemon
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Select your pokemon
      </Typography>
      
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        {pokemonData.map((pokemon) => (
          <Grid item xs={6} sm={4} md={2.4} key={pokemon.name}>
            <StyledCard 
              onClick={() => handleSelectPokemon(pokemon)}
              isSelected={pokemon.id === selectedPokemon?.id || pokemon.id === opponent?.id}
              isOpponent={pokemon.id === opponent?.id}
            >
              <CardMedia
                component="img"
                height="140"
                image={pokemon.imageUrl}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography variant="body2">{pokemon.name}</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* {battleResult && (
        <Paper sx={{ padding: 2, marginBottom: 2, backgroundColor: '#e3f2fd' }}>
          <Typography variant="h6">{battleResult}</Typography>
        </Paper>
      )} */}

      {(selectedPokemon && opponent) && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <PokemonCard pokemon={selectedPokemon} onClear={() => setSelectedPokemon(null)}/>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" >
                Start Battle
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <PokemonCard pokemon={opponent} onClear={() => setOpponent(null)} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default App
