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
import { createPost } from "../graphql/mutations";
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
export default function PostCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    user: "",
    username: "",
    topicID: "",
    createdAt: "",
    Favorited: false,
    likes: "",
    likedBy: [],
    replies: [],
    image: "",
  };
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [content, setContent] = React.useState(initialValues.content);
  const [user, setUser] = React.useState(initialValues.user);
  const [username, setUsername] = React.useState(initialValues.username);
  const [topicID, setTopicID] = React.useState(initialValues.topicID);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [Favorited, setFavorited] = React.useState(initialValues.Favorited);
  const [likes, setLikes] = React.useState(initialValues.likes);
  const [likedBy, setLikedBy] = React.useState(initialValues.likedBy);
  const [replies, setReplies] = React.useState(initialValues.replies);
  const [image, setImage] = React.useState(initialValues.image);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSubject(initialValues.subject);
    setContent(initialValues.content);
    setUser(initialValues.user);
    setUsername(initialValues.username);
    setTopicID(initialValues.topicID);
    setCreatedAt(initialValues.createdAt);
    setFavorited(initialValues.Favorited);
    setLikes(initialValues.likes);
    setLikedBy(initialValues.likedBy);
    setCurrentLikedByValue("");
    setReplies(initialValues.replies);
    setCurrentRepliesValue("");
    setImage(initialValues.image);
    setErrors({});
  };
  const [currentLikedByValue, setCurrentLikedByValue] = React.useState("");
  const likedByRef = React.createRef();
  const [currentRepliesValue, setCurrentRepliesValue] = React.useState("");
  const repliesRef = React.createRef();
  const validations = {
    subject: [{ type: "Required" }],
    content: [{ type: "Required" }],
    user: [{ type: "Required" }],
    username: [{ type: "Required" }],
    topicID: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    Favorited: [],
    likes: [],
    likedBy: [],
    replies: [],
    image: [{ type: "Required" }],
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
          user,
          username,
          topicID,
          createdAt,
          Favorited,
          likes,
          likedBy,
          replies,
          image,
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
            query: createPost.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostCreateForm")}
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
              user,
              username,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies,
              image,
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
              user,
              username,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies,
              image,
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
        label="User"
        isRequired={true}
        isReadOnly={false}
        value={user}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              user: value,
              username,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies,
              image,
            };
            const result = onChange(modelFields);
            value = result?.user ?? value;
          }
          if (errors.user?.hasError) {
            runValidationTasks("user", value);
          }
          setUser(value);
        }}
        onBlur={() => runValidationTasks("user", user)}
        errorMessage={errors.user?.errorMessage}
        hasError={errors.user?.hasError}
        {...getOverrideProps(overrides, "user")}
      ></TextField>
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              user,
              username: value,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies,
              image,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="Topic id"
        isRequired={true}
        isReadOnly={false}
        value={topicID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              user,
              username,
              topicID: value,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies,
              image,
            };
            const result = onChange(modelFields);
            value = result?.topicID ?? value;
          }
          if (errors.topicID?.hasError) {
            runValidationTasks("topicID", value);
          }
          setTopicID(value);
        }}
        onBlur={() => runValidationTasks("topicID", topicID)}
        errorMessage={errors.topicID?.errorMessage}
        hasError={errors.topicID?.hasError}
        {...getOverrideProps(overrides, "topicID")}
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
              user,
              username,
              topicID,
              createdAt: value,
              Favorited,
              likes,
              likedBy,
              replies,
              image,
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
              user,
              username,
              topicID,
              createdAt,
              Favorited: value,
              likes,
              likedBy,
              replies,
              image,
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
              user,
              username,
              topicID,
              createdAt,
              Favorited,
              likes: value,
              likedBy,
              replies,
              image,
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
              user,
              username,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy: values,
              replies,
              image,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              user,
              username,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies: values,
              image,
            };
            const result = onChange(modelFields);
            values = result?.replies ?? values;
          }
          setReplies(values);
          setCurrentRepliesValue("");
        }}
        currentFieldValue={currentRepliesValue}
        label={"Replies"}
        items={replies}
        hasError={errors?.replies?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("replies", currentRepliesValue)
        }
        errorMessage={errors?.replies?.errorMessage}
        setFieldValue={setCurrentRepliesValue}
        inputFieldRef={repliesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Replies"
          isRequired={false}
          isReadOnly={false}
          value={currentRepliesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.replies?.hasError) {
              runValidationTasks("replies", value);
            }
            setCurrentRepliesValue(value);
          }}
          onBlur={() => runValidationTasks("replies", currentRepliesValue)}
          errorMessage={errors.replies?.errorMessage}
          hasError={errors.replies?.hasError}
          ref={repliesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "replies")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Image"
        isRequired={true}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              content,
              user,
              username,
              topicID,
              createdAt,
              Favorited,
              likes,
              likedBy,
              replies,
              image: value,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
