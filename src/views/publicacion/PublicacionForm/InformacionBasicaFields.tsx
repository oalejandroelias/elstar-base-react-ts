import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import Select from '@/components/ui/Select'
import { Upload } from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'

type FormFieldsName = {
    Id: string
    Titulo: string
    Resumen: string
    Archivo: string
    UbiFisId: string
}

type InformacionBasicaFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        Resumen: string
        UbiFisId: string
        //tags: Options
        [key: string]: unknown
    }
}

const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const InformacionBasicaFields = (props: InformacionBasicaFields) => {
    const { values = { UbiFisId: '', tags: [] }, touched, errors } = props

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

            {/* <FormItem
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
            </FormItem> */}
            {/* <FormItem
                label="Lugar"
                invalid={(errors.UbiFisId && touched.UbiFisId) as boolean}
                errorMessage={errors.UbiFisId}
            >
                <Field
                    type="number"
                    autoComplete="off"
                    name="UbiFisId"
                    placeholder="UbiFisId"
                    component={Input}
                />
            </FormItem> */}

<div className="col-span-1">
                    <FormItem
                        label="Lugar"
                        invalid={
                            (errors.UbiFisId && touched.UbiFisId) as boolean
                        }
                        errorMessage={errors.UbiFisId}
                    >
                        <Field name="UbiFisId">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
                                        (category) =>
                                            category.value === values.UbiFisId
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

            <FormItem
                label="Descripción"
                labelClass="!justify-start"
                invalid={(errors.Resumen && touched.Resumen) as boolean}
                errorMessage={errors.Resumen}
            >
                <Field name="Resumen">
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


            <FormItem>
            <div>
            <div className="mb-4">
                <Upload>
                    <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                        Cargar Archivo
                    </Button>
                </Upload>
            </div>
            <div>
                <Upload draggable>
                    <div className="my-16 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <FcImageFile />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Soltar archivo aquí, o{' '}
                            </span>
                            <span className="text-blue-500">Explorar</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                            Support: jpeg, png, gif
                        </p>
                    </div>
                </Upload>
            </div>
        </div>
            </FormItem>
        </AdaptableCard>
    )
}

export default InformacionBasicaFields
