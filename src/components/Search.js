import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import SearchService from '../services/SearchService';

function SearchComponent() {
    const [shoeData, setShoeData] = useState(null);
    const [shoeName, setShoeName] = useState('');

    const handleSearch = async () => {
        const data = await SearchService.searchByShoeName(shoeName);
        setShoeData(data);
    };

    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center" mt={5}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Search By Shoe Name"
                    value={shoeName}
                    onChange={(e) => setShoeName(e.target.value)}
                    variant="outlined"
                    sx={{ borderRadius: '8px', mb: -0, ml: 24 }}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: '80px',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'darkgrey'
                        },
                        p: '8px'
                    }}
                >
                    Search
                </Button>
            </Grid>
            {shoeData && (
                <Grid item xs={12} md={5}>
                    <Card sx={{ borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                        <img src={shoeData.imageUrl} alt={shoeData.name} style={{ height: '200px', width: '400px' }} />
                        <CardContent>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                                {shoeData.name}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom sx={{ padding: '4px 20px', border: '1px solid black', display: 'inline-block', fontSize: 25, color: 'black', mt: 1, mb: -2 }}>
                                {shoeData.price}
                            </Typography>
                            <Typography variant="h6" gutterBottom sx={{ color: 'grey.700', mt: 4 }}>
                                {shoeData.dateAndTime}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}

export default SearchComponent;
