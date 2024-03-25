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
    upload: string
}

type InformacionBasicaFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        Resumen: string
        UbiFisId: string
        //tags: Options
        [key: string]: unknown
        upload: []
    }
    file_limits: {
        MIN_UPLOAD: number
        MAX_UPLOAD: number
    }
}

const categories = [
    { label: 'Copade', value: '1' },
    { label: 'Cloths', value: '2' },
    { label: 'Devices', value: '3' },
    { label: 'Shoes', value: '4' },
    { label: 'Watches', value: '5' },
]

const InformacionBasicaFields = (props: InformacionBasicaFields) => {
    const { file_limits, values = { UbiFisId: '', upload: [], tags: [] }, touched, errors } = props


    const beforeUpload = (file: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 5000000

        if (fileList.length >= file_limits.MAX_UPLOAD) {
            return `You can only upload ${file_limits.MAX_UPLOAD} file(s)`
        }

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

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


            <FormItem
                                asterisk
                                label="Upload"
                                invalid={Boolean(
                                    errors.upload && touched.upload
                                )}
                                errorMessage={errors.upload as string}
                            >
                                <Field name="upload">
                                    {({
                                        field,
                                        form,
                                    //}: FieldProps<FormModel>) => (
                                    }: FieldProps) => (
                                        <Upload
                                            beforeUpload={beforeUpload}
                                            fileList={values.upload}
                                            onChange={(files) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    files
                                                )
                                            }
                                            onFileRemove={(files) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    files
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
        </AdaptableCard>
    )
}

export default InformacionBasicaFields
