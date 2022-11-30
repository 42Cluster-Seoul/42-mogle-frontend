import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import useStore from "../store.js";

const AttendanceButton = () => {
  const [open, setOpen] = useState(false);
  const [buttonStatus, setButton] = useState(true);
  const [buttonLetter, setLetter] = useState("출석체크");
  const [isSameWithTodayWord, setIsSameWithTodayWord] = useState(true);
  const { _intraId, setIsAttended, _server } = useStore((state) => state);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = event.target.todayWord.value;

    try {
      const response = await axios.post(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/attendance/userAttendance`,
        {
          intraId: _intraId,
          todayWord: inputValue,
        }
      );
      console.log(response);
      if (response.status === 201) {
        if (response.data.statusAttendance === 0) {
          setOpen(false);
          buttonChecker();
          setIsAttended(true);
        } else if (response.data.statusAttendance === 2) {
          setIsSameWithTodayWord(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttonChecker = async () => {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/attendance/${_intraId}/buttonStatus`
      );
      setButton(response.data);

      if (response.data === 1) setLetter("출석가능 시간이 아닙니다");
      else if (response.data === 2) setLetter("이미 출석체크를 완료했습니다");
      else if (response.data === 3)
        setLetter("오늘의 단어가 아직 설정되지 않았습니다");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    buttonChecker();
  }, [buttonStatus]);

  return (
    <>
      <Button
        disabled={buttonStatus !== 0 ? true : false}
        onClick={() => {
          handleClickOpen();
          buttonChecker();
        }}
        variant="contained"
        color="success"
        align="center"
        sx={{ mt: 3, width: 1 / 2 }}
      >
        {buttonLetter}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {!isSameWithTodayWord && (
          <Alert severity="error">오늘의 단어와 일치하지 않습니다.</Alert>
        )}
        <DialogTitle>오늘의 단어를 입력해주세요.</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="todayWord"
              label="오늘의 단어"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button type="submit">제출</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AttendanceButton;
