import React,{useState} from 'react'
import initialData from './Constant/Constant'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
export default function ShowTable() {
    const [editOpen, setEditOpen] = useState(false);
    const [editedRow, setEditedRow] = useState(null);
    const [data, setData] = useState(initialData);

    const handleEditClick = (row) => {
      setEditedRow(row);
      setEditOpen(true);
    };
  
    const handleEditClose = () => {
      setEditOpen(false);
    };
  
    const handleSaveEdit = () => {
      const apiUrl = 'https://example/updateData';
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedRow),
      })
        .then(response => response.json())
        // .then(updatedDataFromServer => {
        //   const updatedData = data.map(item =>
        //     item.id === editedRow.id ? updatedDataFromServer : item
        //   );
        //   setData(updatedData);
        //   console.log('Data updated successfully:', updatedDataFromServer);
        // })
        .catch(error => {
          console.error('Error updating data:', error);
        });
        
        const updatedData = initialData.map(item =>
            item.id === editedRow.id ? editedRow : item
          );
          setData(updatedData);
      console.log(`Data updated successfully: ${editedRow.content}`);
      setEditOpen(false);
    };
  return (
    <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell colSpan={3}><b>MONTH 1</b> </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 },width:"50%" }}
                >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.content}</TableCell>
                <TableCell><ModeEditIcon sx={{cursor:"pointer",}} onClick={() => handleEditClick(row)}/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
        <input
            label="Content"
            value={editedRow ? editedRow.content : ''}
            onChange={(e) => setEditedRow({ ...editedRow, content: e.target.value })}
            fullWidth
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleEditClose}>Cancel</Button>
        <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
    </Dialog>
    </div>
  )
}
