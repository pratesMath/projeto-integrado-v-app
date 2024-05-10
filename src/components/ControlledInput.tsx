import { Control, Controller, FieldError } from "react-hook-form";
import { Text, View } from "react-native";
import { Input, InputProps } from "./Input";

type Props = InputProps & {
  control: Control<any>;
  name: string;
  error?: FieldError;
};
// Componente para controlar o Input de formulário
export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text className="text-red-600 mb-3">{error.message}</Text>}
    </View>
  );
}
