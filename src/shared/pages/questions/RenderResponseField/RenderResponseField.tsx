// RenderResponseField.tsx
import React from 'react';
import { TextField, Select, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { IResponseOption, Question } from '../DetalheDeQuestoes';

type RenderResponseFieldProps = {
    question: Question;
    responseTypes: IResponseOption[];
  };

const RenderResponseField: React.FC<RenderResponseFieldProps> = ({ question, responseTypes }) => {
  const selectedType = responseTypes.find((type) => type.id === question.responseTypeId);

  if (!selectedType) return null;

  switch (selectedType.namePatterns) {
    case 'Text':
      return <TextField fullWidth placeholder="Resposta do usuário" />;
    case 'DropDown':
      return (
        <Select fullWidth displayEmpty>
          <MenuItem value="" disabled>Selecione uma opção</MenuItem>
          {question.responseOptions?.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      );
    case 'RadioButton':
      return (
        <FormControl>
          <FormLabel>Selecione uma opção</FormLabel>
          <RadioGroup row>
            {question.responseOptions?.map((option, index) => (
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
