// RenderResponseField.tsx
import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, SelectChangeEvent } from '@mui/material';
import { IResponseOption, Question } from '../DetalheDeQuestoes';

type RenderResponseFieldProps = {
    question: Question;
    responseOption: IResponseOption[];
  };

const RenderResponseField: React.FC<RenderResponseFieldProps> = ({ question, responseOption }) => {
  const [responseValue, setResponseValue] = useState<string | number | null>(null);
  const selectedType = responseOption.find((type) => type.id === question.responseOptionId);

  if (!selectedType) return null;

  const handleTextOrRadioChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResponseValue(event.target.value);
  };

  // Função de atualização para Select
  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
      setResponseValue(event.target.value);
  };

  switch (selectedType.namePatterns) {
    case 'Text':
        return (
            <TextField
                fullWidth
                placeholder="Resposta do usuário"
                value={responseValue || ''}  // Vincula ao estado
                onChange={handleTextOrRadioChange}  // Atualiza o estado ao digitar
            />
        );
    case 'DropDown':
        return (
            <Select
                fullWidth
                value={responseValue || ''}  // Vincula ao estado
                onChange={handleSelectChange}  // Atualiza o estado ao selecionar
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
                    value={responseValue || ''}  // Vincula ao estado
                    onChange={handleTextOrRadioChange}  // Atualiza o estado ao selecionar
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

export default RenderResponseField;
