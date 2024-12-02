import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { ModalWithOverlay } from "@/shared/ui/Modal";
import { useGetTripCompositionQuery } from "@/entities/trips/api/tripsApi";
import { useGetEmployeesQuery } from "@/entities/employee/api/employeesApi";
import { ITrip } from "@/entities/trips/model/types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteTripMutation,
  useAddTripCompositionMutation,
} from "@/entities/trips/api/tripsApi";
import { Employee } from "@/entities/employee";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { useValidation } from "@/shared/lib/hooks/useValidate";
import { validatePositionCode } from "../../createTrip/model/validationTripForm";

export const ShowTrip = ({
  trip,
}: {
  trip: ITrip;
}) => {
  const [tripOpen, setTripOpen] = useState(false);
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: compositionBusinessTrip = [] } = useGetTripCompositionQuery();
  const [deleteTrip, { isLoading }] = useDeleteTripMutation();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const user = useAppSelector((state) => state.user.user);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const employee = employees?.find(
      (employee) => employee.ТабельныйНомер === Number(e.target.value)
    );
    setSelectedEmployee(employee || null);
  };

  const tripEmployees = employees?.filter((employee) =>
    compositionBusinessTrip?.some(
      (composition) =>
        composition.ТабельныйНомер === employee.ТабельныйНомер &&
        composition.НомерЗаписи === trip.Организация
    )
  );

  const handleDelete = async (id: number, organization: string) => {
    try {
      await deleteTrip({ id, organization });
    } catch (error) {
      console.error(error);
    }
  };

  const [addTripComposition, { isLoading: isLoadingAddTripComposition }] =
    useAddTripCompositionMutation();

  const filteredEmployees = employees?.filter(
    (employee) =>
      employee.ДатаУвольнения === "NULL" &&
      !compositionBusinessTrip?.some(
        (composition) =>
          composition.ТабельныйНомер === employee.ТабельныйНомер &&
          composition.НомерЗаписи === trip.Организация
      )
  );

  const { errors, validateForm } = useValidation<{
    ТабельныйНомер: string;
  }>({
    ТабельныйНомер: (value) => validatePositionCode(value),
  });

  const handleAddTripComposition = async (id: number, organization: string) => {
    try {
      if (
        !validateForm({
          ТабельныйНомер: selectedEmployee?.ТабельныйНомер?.toString() || "",
        })
      )
        return;
      await addTripComposition({ id, organization });
    } catch (error) {
      console.error(error);
    }
  };
  const isButtonVisible = user?.role === "admin";
  return (
    <>
      {isButtonVisible && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTripOpen(true)}
          sx={{ marginTop: 2 }}
        >
          Показать состав
        </Button>
      )}
      <ModalWithOverlay
        title="Состав командировки"
        onClose={() => setTripOpen(false)}
        open={tripOpen}
      >
        {isLoading || isLoadingAddTripComposition ? (
          <CircularProgress />
        ) : (
          <Box component="ul" sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {tripEmployees?.map((employee: Employee) => (
              <li key={employee.ТабельныйНомер}>
                <Card
                  sx={{
                    marginBottom: 2,
                    boxShadow: "0px 5px 10px 2px rgba(62, 168, 249, 0.2)",
                  }}
                >
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">
                      {employee.ФИО} - Табельный номер:{" "}
                      {employee.ТабельныйНомер}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      sx={{
                        color: "red",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                      onClick={() =>
                        handleDelete(employee.ТабельныйНомер, trip.Организация)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </li>
            ))}
          </Box>
        )}
        <CustomSelect
          name="ТабельныйНомер"
          label="Табельный номер"
          options={filteredEmployees?.map((employee) => ({
            value: employee.ТабельныйНомер.toString(),
            label: employee.ФИО + " - " + employee.ТабельныйНомер,
          }))}
          value={selectedEmployee?.ТабельныйНомер?.toString() || ""}
          onChange={handleChange}
          error={!!errors?.ТабельныйНомер}
          helperText={errors?.ТабельныйНомер}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleAddTripComposition(
              Number(selectedEmployee?.ТабельныйНомер),
              trip.Организация
            )
          }
          sx={{ marginTop: 2 }}
        >
          Добавить сотрудника
        </Button>
      </ModalWithOverlay>
    </>
  );
};
