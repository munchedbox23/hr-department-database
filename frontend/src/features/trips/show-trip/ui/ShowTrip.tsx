import { Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { ModalWithOverlay } from "@/shared/ui/Modal";
import { useGetTripCompositionQuery } from "@/entities/trips/api/tripsApi";
import { useGetEmployeesQuery } from "@/entities/employee/api/employeesApi";
import { ITrip } from "@/entities/trips/model/types/types";

export const ShowTrip = ({ trip }: { trip: ITrip }) => {
  const [tripOpen, setTripOpen] = useState(false);
  const { data: employees } = useGetEmployeesQuery();
  const { data: compositionBusinessTrip } = useGetTripCompositionQuery();

  const tripEmployees = employees?.filter((employee) =>
    compositionBusinessTrip?.some(
      (composition) =>
        composition.ТабельныйНомер === employee.ТабельныйНомер &&
        composition.НомерЗаписи === trip.НомерЗаписи
    )
  );

  return (
    <>
      {tripEmployees && tripEmployees.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTripOpen(true)}
          sx={{ marginTop: 2 }}
        >
          Показать состав командировки
        </Button>
      )}
      {tripOpen && (
        <ModalWithOverlay
          title="Состав командировки"
          onClose={() => setTripOpen(false)}
          open={tripOpen}
        >
          <ul>
            {tripEmployees?.map((employee) => (
              <li key={employee.ТабельныйНомер}>
                <Card
                  sx={{
                    marginBottom: 2,
                    boxShadow: "0px 5px 10px 2px rgba(62, 168, 249, 0.2)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {employee.ФИО} - Табельный номер:{" "}
                      {employee.ТабельныйНомер}
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </ModalWithOverlay>
      )}
    </>
  );
};
