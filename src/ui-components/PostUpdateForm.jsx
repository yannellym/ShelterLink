/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getPost } from "../graphql/queries";
import { updatePost } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function PostUpdateForm(props) {
  const {
    id: idProp,
    post: postModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    subject: "",
    content: "",
    createdAt: "",
    Favorited: false,
    likes: "",
    likedBy: [],
  };
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [content, setContent] = React.useState(initialValues.content);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [Favorited, setFavorited] = React.useState(initialValues.Favorited);
  const [likes, setLikes] = React.useState(initialValues.likes);
  const [likedBy, setLikedBy] = React.useState(initialValues.likedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = postRecord
      ? { ...initialValues, ...postRecord }
      : initialValues;
    setSubject(cleanValues.subject);
    setContent(cleanValues.content);
    setCreatedAt(cleanValues.createdAt);
    setFavorited(cleanValues.Favorited);
    setLikes(cleanValues.likes);
    setLikedBy(cleanValues.likedBy ?? []);
    setCurrentLikedByValue("");
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(postModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPost
        : postModelProp;
      setPostRecord(record);
    };
    queryData();
  }, [idProp, postModelProp]);
  React.useEffect(resetStateValues, [postRecord]);
  const [currentLikedByValue, setCurrentLikedByValue] = React.useState("");
  const likedByRef = React.createRef();
  const validations = {
    subject: [{ type: "Required" }],
    content: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    Favorited: [],
    likes: [],
    likedBy: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          subject,
          content,
          createdAt,
          Favorited: Favorited ?? null,
          likes: likes ?? null,
          likedBy: likedBy ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updatePost.replaceAll("__typename", ""),
            variables: {
              input: {
                id: postRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostUpdateForm")}
      {...rest}
    >
      <TextField
        label="Subject"
        isRequired={true}
        isReadOnly={false}
        value={subject}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject: value,
              content,
              createdAt,
              Favorited,
              likes,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.subject ?? value;
          }
          if (errors.subject?.hasError) {
            runValidationTasks("subject", value);
          }
          setSubject(value);
        }}
        onBlur={() => runValidationTasks("subject", subject)}
        errorMessage={errors.subject?.errorMessage}
        hasError={errors.subject?.hasError}
        {...getOverrideProps(overrides, "subject")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={true}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              content: value,
              createdAt,
              Favorited,
              likes,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              subject,
              content,
              createdAt: value,
              Favorited,
              likes,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <SwitchField
        label="Favorited"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Favorited}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              createdAt,
              Favorited: value,
              likes,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.Favorited ?? value;
          }
          if (errors.Favorited?.hasError) {
            runValidationTasks("Favorited", value);
          }
          setFavorited(value);
        }}
        onBlur={() => runValidationTasks("Favorited", Favorited)}
        errorMessage={errors.Favorited?.errorMessage}
        hasError={errors.Favorited?.hasError}
        {...getOverrideProps(overrides, "Favorited")}
      ></SwitchField>
      <TextField
        label="Likes"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={likes}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              subject,
              content,
              createdAt,
              Favorited,
              likes: value,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.likes ?? value;
          }
          if (errors.likes?.hasError) {
            runValidationTasks("likes", value);
          }
          setLikes(value);
        }}
        onBlur={() => runValidationTasks("likes", likes)}
        errorMessage={errors.likes?.errorMessage}
        hasError={errors.likes?.hasError}
        {...getOverrideProps(overrides, "likes")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              createdAt,
              Favorited,
              likes,
              likedBy: values,
            };
            const result = onChange(modelFields);
            values = result?.likedBy ?? values;
          }
          setLikedBy(values);
          setCurrentLikedByValue("");
        }}
        currentFieldValue={currentLikedByValue}
        label={"Liked by"}
        items={likedBy}
        hasError={errors?.likedBy?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("likedBy", currentLikedByValue)
        }
        errorMessage={errors?.likedBy?.errorMessage}
        setFieldValue={setCurrentLikedByValue}
        inputFieldRef={likedByRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Liked by"
          isRequired={false}
          isReadOnly={false}
          value={currentLikedByValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.likedBy?.hasError) {
              runValidationTasks("likedBy", value);
            }
            setCurrentLikedByValue(value);
          }}
          onBlur={() => runValidationTasks("likedBy", currentLikedByValue)}
          errorMessage={errors.likedBy?.errorMessage}
          hasError={errors.likedBy?.hasError}
          ref={likedByRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "likedBy")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || postModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || postModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
