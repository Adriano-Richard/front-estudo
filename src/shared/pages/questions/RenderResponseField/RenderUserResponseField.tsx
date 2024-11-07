// RenderUserResponseField.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    SelectChangeEvent,
} from '@mui/material';
import { IResponseOption, Question } from '../DetalheDeQuestoes';

type RenderUserResponseFieldProps = {
    question: Question;
    responseOption: IResponseOption[];
    onResponseChange: (value: string) => void;
};

const RenderUserResponseField: React.FC<RenderUserResponseFieldProps> = ({
    question,
    responseOption,
    onResponseChange,
}) => {
    const [responseValue, setResponseValue] = useState<string>('');
    const prevResponseValue = useRef<string>(''); // Para armazenar o valor anterior
    const selectedType = responseOption.find((type) => type.id === question.responseOptionId);

    useEffect(() => {
        // Só chama onResponseChange se o valor realmente mudou
        if (responseValue !== '' && responseValue !== prevResponseValue.current) {
            onResponseChange(responseValue);
            prevResponseValue.current = responseValue; // Atualiza o valor anterior
        }
    }, [responseValue, onResponseChange]);

    if (!selectedType) return null;

    const handleTextOrRadioChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setResponseValue(event.target.value);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setResponseValue(event.target.value);
    };

    switch (selectedType.namePatterns) {
        case 'Text':
            return (
                <TextField
                    fullWidth
                    placeholder="Resposta do usuário"
                    value={responseValue}
                    onChange={handleTextOrRadioChange}
                />
            );
        case 'DropDown':
            return (
                <Select
                    fullWidth
                    value={responseValue}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione uma opção</MenuItem>
                    {question.responseOptions?.responses?.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            );
        case 'RadioButton':
            return (
                <FormControl>
                    <FormLabel>Selecione uma opção</FormLabel>
                    <RadioGroup
                        row
                        value={responseValue}
                        onChange={handleTextOrRadioChange}
                    >
                        {question.responseOptions?.responses?.map((option, index) => (
                            <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        default:
            return null;
    }
};

export default RenderUserResponseField;
