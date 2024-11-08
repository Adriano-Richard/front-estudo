import { Avatar, Box, Button, Card, CardContent, Grid, Link, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { IListUniversity, UniversityService } from "../../../services/universities/UniversityService";
import { useDebounce } from "../../../hooks/UseDebounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserGroupsService } from "../../../services/occupations/UserGroupsService";
import { ageGroupMap, AuthService, experienceLevelMap, ICreateUserRequest, occupationMap, titleMap } from "../../../services/auth/AuthService";


const Cadastro: React.FC = () => {
    const [searchParams ] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();
    const [_isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<IListUniversity[]>([]);
    const [occupation, setOccupation] = useState<string[]>([]);
    const [formValues, setFormValues] = useState({
        Name: "",
        LastName: "",
        Email: "",
        Password: "",
        selectUniversity: "",
        selectedOccupation: "",
        CPF: "",
        selectedAge: "",
        selectedTitle: "",
        selectedExperienceLevel: "",
    });

    const [age, setAge] = useState<string[]>([]);

    const [title, setTitle] = useState<string[]>([]);

    const [experienceLevel, setExperienceLevel] = useState<string[]>([]);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            UniversityService.getAll(pagina, busca)
            .then((result) => {
                setIsLoading(false);
                
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);

                    setRows(result.data);
                }
            });
            UserGroupsService.getOccupations()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setOccupation(result.data);
                }
            });
            UserGroupsService.getAges()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setAge(result.data);
                }
            });
            UserGroupsService.getTitles()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTitle(result.data);
                }
            });
            UserGroupsService.getExperienceLevels()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setExperienceLevel(result.data);
                }
            });
        })
        
    }, [busca, pagina]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleChange = (field: keyof typeof formValues) => (event: SelectChangeEvent<string>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: event.target.value,
        }));
    };

    const options = [
        { label: "Selecione uma universidade", value: "selectUniversity", items: rows.map((row) => ({ label: row.name, value: row.id.toString() })) },
        { label: "Selecione uma ocupação", value: "selectedOccupation", items: occupation },
        { label: "Selecione seu grupo de idade", value: "selectedAge", items: age },
        { label: "Selecione seu título", value: "selectedTitle", items: title },
        { label: "Selecione seu tempo de experiência", value: "selectedExperienceLevel", items: experienceLevel },
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const userData: ICreateUserRequest = {
            name: formValues.Name,
            lastName: formValues.LastName,
            email: formValues.Email,
            password: formValues.Password,
            universityId: formValues.selectUniversity,
            cargo: occupationMap[formValues.selectedOccupation],
            CPF: formValues.CPF,
            idade: ageGroupMap[formValues.selectedAge], // Índice do enum AgeGroup
            titulo: titleMap[formValues.selectedTitle], // Índice do enum Title
            tempoDeTrabalho: experienceLevelMap[formValues.selectedExperienceLevel],
        };
    
        try {
          await AuthService.createUser(userData);
          navigate('/');
        } catch (error: any) {
        }
    };


return (
    <Box 
      width="100%" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
          <Card>
            <CardContent>
                <div >
                    <Avatar >
                    
                    </Avatar>
                    <Typography component="h1" variant="h5" mb={2}>
                    Cadastro
                    </Typography>
                    <form  noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome"
                                autoFocus
                                value={formValues.Name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Sobrenome"
                                name="LastName"
                                autoComplete="lname"
                                value={formValues.LastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cpf"
                                label="CPF"
                                name="CPF"
                                autoComplete="cpf"
                                value={formValues.CPF}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {options.map(({ label, value, items }) => (
                            <Grid item xs={12} key={value}>
                                <Select
                                    fullWidth
                                    value={formValues[value as keyof typeof formValues]}
                                    onChange={handleChange(value as keyof typeof formValues)}
                                    displayEmpty
                                    variant="outlined"
                                    required
                                >
                                    <MenuItem value="" disabled>
                                        {label}
                                    </MenuItem>
                                    {items.map((item) =>
                                        typeof item === "string" ? (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ) : (
                                            <MenuItem key={item.value} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="Email"
                                autoComplete="email"
                                value={formValues.Email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="Password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formValues.Password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Cadastrar
                    </Button>
                    <Grid container justifyContent="flex-end" mt={2}>
                        <Grid item>
                        <Link href="./" variant="body2">
                            Já possui uma conta? Faça login!
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cadastro;
