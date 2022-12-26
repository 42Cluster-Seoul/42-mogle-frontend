import { useState } from "react";
import DateSelector from "./DateSelector";
import MonthlyUserInfo from "./MonthlyUserInfo";
import MonthlyUserTable from "./MonthlyUserTable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function DashboardPage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* EXPLAIN: 특정 연, 월 조회 컴포넌트  */}
        <DateSelector />

        {/* EXPLAIN: 이번 달 참여 인원 통계  */}
        <MonthlyUserInfo text="이번 달 참여 인원" />
        <MonthlyUserInfo text="이번 달 개근 인원" />

        {/* EXPLAIN: 이번 달 참여자 목록 테이블 */}
        <MonthlyUserTable />

        {/* EXPLAIN: 이번 달 개근자 목록 테이블 */}
        {/* <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                이번 달 개근자 목록
              </Typography>

              <Box sx={{ mt: 1, height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  disableRowSelectionOnClick
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        {/* EXPLAIN: 출석 데이터 수정 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" component="div">
              DB 수정
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
