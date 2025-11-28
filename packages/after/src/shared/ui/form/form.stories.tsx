import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './form';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';

/**
 * # Form 컴포넌트
 *
 * Form은 React Hook Form을 기반으로 구축된 포괄적인 폼 시스템입니다.
 * FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription 등의 하위 컴포넌트를 조합하여
 * 접근성이 우수하고 유효성 검사가 적용된 폼을 쉽게 구축할 수 있습니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import * as z from 'zod';
 * import {
 *   Form,
 *   FormField,
 *   FormItem,
 *   FormLabel,
 *   FormControl,
 *   FormMessage,
 * } from '@/shared/ui/form';
 * import { Input } from '@/shared/ui/input';
 *
 * const formSchema = z.object({
 *   username: z.string().min(2, 'Username must be at least 2 characters'),
 * });
 *
 * function MyForm() {
 *   const form = useForm({
 *     resolver: zodResolver(formSchema),
 *     defaultValues: { username: '' },
 *   });
 *
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <Form {...form}>
 *       <form onSubmit={form.handleSubmit(onSubmit)}>
 *         <FormField
 *           control={form.control}
 *           name="username"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Username</FormLabel>
 *               <FormControl>
 *                 <Input {...field} />
 *               </FormControl>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 *         <Button type="submit">Submit</Button>
 *       </form>
 *     </Form>
 *   );
 * }
 * ```
 *
 * ## 컴포넌트 구조
 *
 * - **Form**: React Hook Form의 FormProvider 래퍼
 * - **FormField**: Controller를 래핑하여 필드 컨텍스트 제공
 * - **FormItem**: 필드 그룹 컨테이너 (label, input, description, message)
 * - **FormLabel**: 접근성이 향상된 레이블, 에러 상태 표시
 * - **FormControl**: Slot 패턴으로 입력 컴포넌트 래핑
 * - **FormDescription**: 필드 설명 텍스트
 * - **FormMessage**: 유효성 검사 에러 메시지
 *
 * ## 특징
 *
 * - **React Hook Form 통합**: 선언적이고 성능이 우수한 폼 관리
 * - **Zod 유효성 검사**: 타입 안전한 스키마 기반 검증
 * - **완벽한 접근성**: aria-describedby, aria-invalid 등 ARIA 속성 자동 설정
 * - **에러 처리**: 자동 에러 메시지 표시 및 시각적 피드백
 * - **타입 안전성**: TypeScript 제네릭으로 완전한 타입 추론
 * - **조합 가능**: 모든 입력 컴포넌트와 함께 사용 가능
 */
const meta: Meta = {
  title: 'UI/Form',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form 컴포넌트는 React Hook Form 기반의 완전한 폼 시스템으로, 유효성 검사와 접근성을 제공합니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-input-field-name', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * 기본 Form 예제입니다.
 * 단일 필드를 가진 간단한 폼 구조를 보여줍니다.
 */
export const Default: Story = {
  render: () => {
    const formSchema = z.object({
      username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
      }),
    });

    const DefaultForm = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
        },
      });

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Form submitted:', data);
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '400px' }}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" style={{ marginTop: '16px' }}>
              Submit
            </Button>
          </form>
        </Form>
      );
    };

    return <DefaultForm />;
  },
};

/**
 * FormDescription을 포함한 예제입니다.
 * 필드에 대한 추가 설명을 제공하는 방법을 보여줍니다.
 */
export const WithDescription: Story = {
  render: () => {
    const formSchema = z.object({
      email: z.string().email({ message: 'Please enter a valid email address.' }),
    });

    const FormWithDescription = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: '',
        },
      });

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Form submitted:', data);
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '400px' }}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" style={{ marginTop: '16px' }}>
              Submit
            </Button>
          </form>
        </Form>
      );
    };

    return <FormWithDescription />;
  },
};

/**
 * 다중 필드를 가진 복잡한 폼 예제입니다.
 * 여러 입력 필드와 다양한 유효성 검사 규칙을 보여줍니다.
 */
export const MultipleFields: Story = {
  render: () => {
    const formSchema = z.object({
      username: z.string().min(3, {
        message: 'Username must be at least 3 characters.',
      }),
      email: z.string().email({
        message: 'Please enter a valid email address.',
      }),
      password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
      }),
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

    const MultipleFieldsForm = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Form submitted:', data);
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="primary">
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      );
    };

    return <MultipleFieldsForm />;
  },
};

/**
 * Checkbox와 함께 사용하는 폼 예제입니다.
 * Checkbox 컴포넌트를 FormControl과 통합하는 방법을 보여줍니다.
 */
export const WithCheckbox: Story = {
  render: () => {
    const formSchema = z.object({
      terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions.',
      }),
      newsletter: z.boolean().optional(),
    });

    const CheckboxForm = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          terms: false,
          newsletter: false,
        },
      });

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Form submitted:', data);
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div style={{ flex: 1 }}>
                        <FormLabel style={{ cursor: 'pointer' }}>
                          Accept terms and conditions
                        </FormLabel>
                        <FormDescription>
                          You agree to our Terms of Service and Privacy Policy.
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div style={{ flex: 1 }}>
                        <FormLabel style={{ cursor: 'pointer' }}>
                          Subscribe to newsletter
                        </FormLabel>
                        <FormDescription>
                          Receive updates about new features and promotions.
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      );
    };

    return <CheckboxForm />;
  },
};

/**
 * 실시간 유효성 검사 예제입니다.
 * 사용자가 입력하는 동안 즉시 피드백을 제공합니다.
 */
export const RealTimeValidation: Story = {
  render: () => {
    const formSchema = z.object({
      username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must not exceed 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
      email: z.string().email('Invalid email address'),
    });

    const RealTimeForm = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange', // Enable real-time validation
        defaultValues: {
          username: '',
          email: '',
        },
      });

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Form submitted:', data);
        alert(JSON.stringify(data, null, 2));
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '400px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormDescription>
                      3-20 characters, letters, numbers, and underscores only.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div style={{
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
              }}>
                <div>Form is {form.formState.isValid ? '✓ valid' : '✗ invalid'}</div>
                <div>Errors: {Object.keys(form.formState.errors).length}</div>
              </div>

              <Button type="submit" variant="primary" disabled={!form.formState.isValid}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      );
    };

    return <RealTimeForm />;
  },
};

/**
 * 실제 사용 사례: 로그인 폼
 * 완전한 로그인 폼 구현 예제입니다.
 */
export const LoginForm: Story = {
  render: () => {
    const loginSchema = z.object({
      email: z.string().email('Please enter a valid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      remember: z.boolean().optional(),
    });

    const LoginFormExample = () => {
      const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: '',
          password: '',
          remember: false,
        },
      });

      const onSubmit = (data: z.infer<typeof loginSchema>) => {
        console.log('Login submitted:', data);
        alert(`Logging in with:\n${JSON.stringify(data, null, 2)}`);
      };

      return (
        <div style={{
          padding: '32px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          maxWidth: '400px',
          background: 'white',
        }}>
          <h2 style={{ margin: 0, marginBottom: '8px' }}>Sign In</h2>
          <p style={{ margin: 0, marginBottom: '24px', color: '#666', fontSize: '14px' }}>
            Enter your credentials to access your account
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel style={{ cursor: 'pointer', marginBottom: 0 }}>
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="primary" fullWidth>
                  Sign In
                </Button>

                <div style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
                  <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                    Forgot password?
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </div>
      );
    };

    return <LoginFormExample />;
  },
};

/**
 * 실제 사용 사례: 회원가입 폼
 * 복잡한 유효성 검사 규칙을 가진 회원가입 폼입니다.
 */
export const SignupForm: Story = {
  render: () => {
    const signupSchema = z.object({
      fullName: z.string().min(2, 'Full name must be at least 2 characters'),
      email: z.string().email('Please enter a valid email address'),
      password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: z.string(),
      terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
      }),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

    const SignupFormExample = () => {
      const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        },
      });

      const onSubmit = (data: z.infer<typeof signupSchema>) => {
        console.log('Signup submitted:', data);
        alert(`Account created for:\n${data.fullName}\n${data.email}`);
      };

      return (
        <div style={{
          padding: '32px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          maxWidth: '500px',
          background: 'white',
        }}>
          <h2 style={{ margin: 0, marginBottom: '8px' }}>Create Account</h2>
          <p style={{ margin: 0, marginBottom: '24px', color: '#666', fontSize: '14px' }}>
            Sign up to get started
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Must be 8+ characters with uppercase, lowercase, and number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div style={{ flex: 1 }}>
                          <FormLabel style={{ cursor: 'pointer' }}>
                            I accept the terms and conditions
                          </FormLabel>
                          <FormDescription>
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                          </FormDescription>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="primary" fullWidth>
                  Create Account
                </Button>
              </div>
            </form>
          </Form>
        </div>
      );
    };

    return <SignupFormExample />;
  },
};

/**
 * 실제 사용 사례: 프로필 설정 폼
 * 선택적 필드와 기본값을 가진 설정 폼입니다.
 */
export const ProfileSettingsForm: Story = {
  render: () => {
    const profileSchema = z.object({
      displayName: z.string().min(2, 'Display name must be at least 2 characters'),
      bio: z.string().max(160, 'Bio must not exceed 160 characters').optional(),
      emailNotifications: z.boolean().optional(),
      marketingEmails: z.boolean().optional(),
    });

    const ProfileForm = () => {
      const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
          displayName: 'John Doe',
          bio: 'Software developer and designer',
          emailNotifications: true,
          marketingEmails: false,
        },
      });

      const bioLength = form.watch('bio')?.length || 0;

      const onSubmit = (data: z.infer<typeof profileSchema>) => {
        console.log('Profile updated:', data);
        alert('Profile settings saved successfully!');
      };

      return (
        <div style={{
          padding: '32px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          maxWidth: '500px',
          background: 'white',
        }}>
          <h2 style={{ margin: 0, marginBottom: '8px' }}>Profile Settings</h2>
          <p style={{ margin: 0, marginBottom: '24px', color: '#666', fontSize: '14px' }}>
            Update your profile information and preferences
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your display name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is how your name will appear to other users.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Tell us about yourself" {...field} />
                      </FormControl>
                      <FormDescription>
                        Brief description for your profile. {bioLength}/160 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div style={{
                  padding: '16px',
                  background: '#f5f5f5',
                  borderRadius: '4px',
                }}>
                  <h4 style={{ margin: 0, marginBottom: '12px', fontSize: '16px' }}>
                    Notification Preferences
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <FormField
                      control={form.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div style={{ flex: 1 }}>
                              <FormLabel style={{ cursor: 'pointer' }}>
                                Email notifications
                              </FormLabel>
                              <FormDescription>
                                Receive email notifications about your account activity.
                              </FormDescription>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div style={{ flex: 1 }}>
                              <FormLabel style={{ cursor: 'pointer' }}>
                                Marketing emails
                              </FormLabel>
                              <FormDescription>
                                Receive emails about new features and promotions.
                              </FormDescription>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      );
    };

    return <ProfileForm />;
  },
};
