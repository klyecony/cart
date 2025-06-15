import {
  addToast,
  Button,
  Form,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Text } from "../ui/Text";
import { db } from "@/db";
import { OtpInput } from "../ui/OtpInput";
import { useModalStack } from "../ui/StackedModal";

interface OtpFormProps {
  email: string;
}

const OtpForm = ({ email }: OtpFormProps) => {
  const { close } = useModalStack();
  const schema = z
    .object({
      code: z.string().length(6, "Der OTP-Code muss genau 6 Zeichen lang sein"),
    })
    .refine(data => /^[0-9]+$/.test(data.code), {
      message: "Der OTP-Code darf nur Ziffern enthalten",
    });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const submit = handleSubmit(values => {
    db.auth
      .signInWithMagicCode({
        email,
        code: values.code,
      })
      .catch(err => {
        addToast({
          title: "Ein Fehler ist aufgetreten",
          description: err.body?.message,
        });
      })
      .finally(() => {
        close();
      });
  });

  return (
    <ModalContent>
      <ModalHeader>
        <Text variant="h2" weight="bold">
          Bestätige deine Email-Adresse
        </Text>
      </ModalHeader>
      <Form onSubmit={submit} className="grow">
        <ModalBody>
          <Text variant="small">
            Wir haben dir einen 6-stelligen Code an{" "}
            <span className="font-semibold text-secondary">{email}</span>. Gib ihn bitte unten ein,
            um dich anzumelden.
          </Text>
          <OtpInput
            name="code"
            control={control}
            color="primary"
            fullWidth={false}
            autoComplete="code"
            label="Einladungscode"
            description="Code eingeben"
          />
        </ModalBody>
        <ModalFooter className="w-full">
          <Button color="primary" type="submit" fullWidth isDisabled={!isDirty}>
            Anmelden
          </Button>
        </ModalFooter>
      </Form>
    </ModalContent>
  );
};

export { OtpForm };
