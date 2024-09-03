import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Pokemon } from "../interfaces/interfaces";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClear: () => void;
}

export default function PokemonCard({ pokemon, onClear }: PokemonCardProps) {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <IconButton
        aria-label="clear"
        onClick={onClear}
      >
        <CloseIcon />
      </IconButton>
      <CardMedia
        component="img"
        height="200"
        content="fit"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom align="left">
          {pokemon.name}
        </Typography>
        {Object.entries(pokemon).map(
          ([stat, value]) =>
            stat !== "imageUrl" ||
            stat !== "name" ||
            (stat !== "id" && (
              <Box key={stat} sx={{ marginBottom: 1 }}>
                <Typography variant="body2">
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </Typography>
                <LinearProgress variant="determinate" value={value} />
              </Box>
            ))
        )}
      </CardContent>
    </Card>
  );
}
