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
export declare type ReplyUpdateFormInputValues = {
    content?: string;
    user?: string;
    username?: string;
    image?: string;
};
export declare type ReplyUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReplyUpdateFormOverridesProps = {
    ReplyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReplyUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReplyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    reply?: any;
    onSubmit?: (fields: ReplyUpdateFormInputValues) => ReplyUpdateFormInputValues;
    onSuccess?: (fields: ReplyUpdateFormInputValues) => void;
    onError?: (fields: ReplyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReplyUpdateFormInputValues) => ReplyUpdateFormInputValues;
    onValidate?: ReplyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReplyUpdateForm(props: ReplyUpdateFormProps): React.ReactElement;
