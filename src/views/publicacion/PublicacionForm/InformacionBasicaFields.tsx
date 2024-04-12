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

const ubicacionFisica = [
    { label: 'Biblioteca', value: '1' },
    { label: 'Hemeroteca', value: '2' },
    { label: 'Referencia', value: '4' },
    { label: 'Serie Copade', value: '3' },
]

const tipo = [
    { label: 'Monografía', value: '1' },
    { label: 'Proyecto', value: '2' },
    { label: 'Seriada', value: '3' },
    { label: 'Tésis', value: '4' },
    { label: 'Doc. No Convencional', value: '5' },
]

const nivelRegistro = [
    { label: 'Analítico', value: '1' },
    { label: 'Monográfico', value: '3' },
    { label: 'Colección', value: '5' },
    { label: 'Seriada', value: '6' },
    { label: 'Monográfico de Monografía', value: '4' },
    { label: 'Analítica de Monografía', value: '2' },
    { label: 'Analítica de Seriada', value: '7' },
]

const archivo = [
    { label: 'CDCyT-COPADE', value: '1' },
]

type FormFieldsName = {
    Archivo: number
    Documento: string
    UbiFisId: string
    Tipo: number
    Nivel: number
    Titulo: string
    Paginas: string
    Tomo: string
    Editorial: string
    Anio: string
    //Tema: string
    //FechaIng: string
    //Tamanio: string
    //Visible: string
    //UltVisita: string
    //CategoriaId: string
    Resumen: string
    URL: string
    ExtraidoDe: string
    //upload: string
}

type InformacionBasicaFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        UbiFisId: string
        Tipo: string
        Nivel: string
        Archivo: string
        //tags: Options
        [key: string]: unknown
        upload: []
    }
    file_limits: {
        MIN_UPLOAD: number
        MAX_UPLOAD: number
    }
}

const InformacionBasicaFields = (props: InformacionBasicaFields) => {
    const { file_limits, values = { UbiFisId: '', Tipo: '', Nivel: '', Archivo: '', upload: [], tags: [] }, touched, errors } = props


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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                    label="N° Registro"
                    invalid={(errors.Documento && touched.Documento) as boolean}
                    errorMessage={errors.Documento}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="Documento"
                        placeholder="Documento"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Páginas"
                    invalid={(errors.Paginas && touched.Paginas) as boolean}
                    errorMessage={errors.Paginas}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="Paginas"
                        placeholder="Páginas"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Volumen"
                    invalid={(errors.Tomo && touched.Tomo) as boolean}
                    errorMessage={errors.Tomo}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="Tomo"
                        placeholder="Volumen"
                        component={Input}
                    />
                </FormItem>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">

                <FormItem
                    label="Editoral"
                    invalid={(errors.Editorial && touched.Editorial) as boolean}
                    errorMessage={errors.Editorial}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="Editorial"
                        placeholder="Editoral"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Año Publicación"
                    invalid={(errors.Anio && touched.Anio) as boolean}
                    errorMessage={errors.Anio}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="Anio"
                        placeholder="Año Publicación"
                        component={Input}
                    />
                </FormItem>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">

                <FormItem
                    label="Ubicación Física"
                    invalid={
                        (errors.UbiFisId && touched.UbiFisId) as boolean
                    }
                    errorMessage={errors.UbiFisId}
                >
                    <Field name="UbiFisId">
                        {({ field, form }: FieldProps) => (
                            <Select
                                placeholder={<div>Seleccionar...</div>}
                                field={field}
                                form={form}
                                options={ubicacionFisica}
                                value={ubicacionFisica.filter(
                                    (category) =>
                                        category.value == values.UbiFisId
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

                <FormItem
                    label="Tipo"
                    invalid={
                        (errors.Tipo && touched.Tipo) as boolean
                    }
                    errorMessage={errors.Tipo}
                >
                    <Field name="Tipo">
                        {({ field, form }: FieldProps) => (
                            <Select
                                placeholder={<div>Seleccionar...</div>}
                                field={field}
                                form={form}
                                options={tipo}
                                value={tipo.filter(
                                    (category) =>
                                        category.value == values.Tipo
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

                <FormItem
                    label="Nivel de Registro"
                    invalid={
                        (errors.Nivel && touched.Nivel) as boolean
                    }
                    errorMessage={errors.Nivel}
                >
                    <Field name="Nivel">
                        {({ field, form }: FieldProps) => (
                            <Select
                                placeholder={<div>Seleccionar...</div>}
                                field={field}
                                form={form}
                                options={nivelRegistro}
                                value={nivelRegistro.filter(
                                    (category) =>
                                        category.value == values.Nivel
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

                <FormItem
                    label="Archivo"
                    invalid={
                        (errors.Archivo && touched.Archivo) as boolean
                    }
                    errorMessage={errors.Archivo}
                >
                    <Field name="Archivo">
                        {({ field, form }: FieldProps) => (
                            <Select
                                placeholder={<div>Seleccionar...</div>}
                                field={field}
                                form={form}
                                options={archivo}
                                value={archivo.filter(
                                    (category) =>
                                        category.value == values.Archivo
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">

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




                <div className='col-span-4'>
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
                </div>

                {/* <FormItem
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
                </FormItem> */}
            </div>
        </AdaptableCard>
    )
}

export default InformacionBasicaFields
