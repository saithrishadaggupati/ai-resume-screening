import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Box
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function JobCard({ job, onDelete }) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb"
      }}
    >
      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >

          <Box sx={{ flex: 1 }}>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {job.title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {job.description}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mt: 3 }}
            >
              {(job.skills || []).map(skill => (
                <Chip
                  key={skill}
                  label={skill}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>

          </Box>

          <IconButton
            color="error"
            onClick={() => onDelete(job._id)}
          >
            <DeleteIcon />
          </IconButton>

        </Box>

      </CardContent>
    </Card>
  );
}
