/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PetUpdateFormInputValues = {
    name?: string;
    age?: string;
    gender?: string;
    size?: string;
    description?: string;
    url?: string;
};
export declare type PetUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    age?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    size?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PetUpdateFormOverridesProps = {
    PetUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    size?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PetUpdateFormProps = React.PropsWithChildren<{
    overrides?: PetUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    pet?: any;
    onSubmit?: (fields: PetUpdateFormInputValues) => PetUpdateFormInputValues;
    onSuccess?: (fields: PetUpdateFormInputValues) => void;
    onError?: (fields: PetUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PetUpdateFormInputValues) => PetUpdateFormInputValues;
    onValidate?: PetUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PetUpdateForm(props: PetUpdateFormProps): React.ReactElement;
