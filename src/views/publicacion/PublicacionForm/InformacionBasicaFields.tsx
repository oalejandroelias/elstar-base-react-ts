import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type FormFieldsName = {
    Id: string
    Titulo: string
    Descripcion: string
    Archivo: string
}

type InformacionBasicaFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const InformacionBasicaFields = (props: InformacionBasicaFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4">
           
            <FormItem
                label="Título"
                invalid={(errors.Titulo && touched.Titulo) as boolean}
                errorMessage={errors.Titulo}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Titulo"
                    placeholder="Título"
                    component={Input}
                />
            </FormItem>

            <FormItem
                label="Archivo"
                invalid={(errors.Titulo && touched.Titulo) as boolean}
                errorMessage={errors.Titulo}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Archivo"
                    placeholder="Archivo"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Descripción"
                labelClass="!justify-start"
                invalid={(errors.Descripcion && touched.Descripcion) as boolean}
                errorMessage={errors.Descripcion}
            >
                <Field name="Descripcion">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default InformacionBasicaFields
