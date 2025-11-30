import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EntityForm, type UserFormValues } from "@/features/management/components/EntityForm"

const meta = {
  title: "Features/Management/EntityForm",
  component: EntityForm,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof EntityForm>

export default meta

type Story = StoryObj<typeof meta>

const userDefaults: UserFormValues = {
  username: "storybook_user",
  email: "storybook@example.com",
  role: "user",
  status: "active",
}

export const UserFormStory: Story = {
  args: {
    entityType: "user",
    mode: "edit",
    defaultValues: userDefaults,
    onSubmit: async (values: UserFormValues) => {
      action("submit")(values)
    },
    onCancel: action("cancel"),
  },
}

