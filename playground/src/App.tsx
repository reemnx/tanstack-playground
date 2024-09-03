import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { formOptions, useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

/** Form Data Interface */
interface User {
  name: string;
  age: string;
  color: string;
}

const mockGlobalState: { userData: User } = {
  userData: {
    name: 'Reem',
    age: '29',
    color: 'Blue',
  },
};

function App() {
  /** Form Options */
  const formOpts = formOptions<User>({
    /** Default values in case you have prefill data */
    defaultValues: {
      name: mockGlobalState.userData.name,
      age: mockGlobalState.userData.age,
      color: mockGlobalState.userData.color,
    },
  });

  /** Form Instance Creation */
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      /** Manual form validation on mount */
      // form.handleSubmit();
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center py-[50px] w-full h-full">
      <h1 className="mb-[28px]">Form example</h1>
      <form
        className="flex flex-col gap-[14px] items-center w-[600px]"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/** Controlled Form Field */}
        <form.Field
          name="name"
          /** Using Validation Library - Zod */
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z
              .string()
              .min(3, 'min 3 chars')
              .max(10, 'max 10 characters'),
          }}
          children={(field) => {
            return (
              <>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onFocus={() => field.setErrorMap({})}
                />
                {/** Show field error value from local error map */}
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              </>
            );
          }}
        />
        <form.Field
          name="age"
          /** Using Validation Library - Zod */
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z
              .string()
              .min(3, 'min 3 chars')
              .max(10, 'max 10 characters'),
          }}
          children={(field) => {
            return (
              <>
                <FloatLabel>
                  <InputText
                    className="text-black"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onFocus={() => field.setErrorMap({})}
                  />
                  <label htmlFor={field.name}>{field.name}</label>
                </FloatLabel>
                {/** Show field error value from local error map */}
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              </>
            );
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <button type="submit">{canSubmit ? 'Submit' : 'Fix Form'}</button>
          )}
        />

        {/** Always enabled button */}
        {/*<button type="submit">Submit</button>*/}
      </form>
    </div>
  );
}

export default App;
