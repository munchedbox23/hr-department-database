import { useGetVacationsQuery, VacationItem } from "@/entities/vacations";
import { Container, Typography } from "@mui/material";
import { ListItemSkeleton } from "@/shared/ui/ListItemSkeleton";
import { ListOfItem } from "@/widgets/ListOfItem";

export const VacationPage = () => {
  const { data: vacations, isLoading } = useGetVacationsQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Отпуска
      </Typography>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <ListItemSkeleton key={index} />
        ))
      ) : (
        <ListOfItem
          items={vacations || []}
          renderItem={(vacation) => <VacationItem vacation={vacation} />}
          getKey={(vacation) => vacation.НомерЗаписи}
        />
      )}
    </Container>
  );
};
