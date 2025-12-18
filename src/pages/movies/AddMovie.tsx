import { NavLink, useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useState, type ChangeEvent, type FormEvent } from "react";
import ApiClient from "../../utils/ApiClient";
import NavbarComponent from "../../components/Navbar";

interface FormMovie {
    judul: string;
    tahunRilis: string;
    sutradara: string;
}

function AddMovie() {

    const navigate = useNavigate(); // ⬅ TAMBAHKAN INI

    const [form, setForm] = useState<FormMovie>({
        judul: "",
        tahunRilis: "",
        sutradara: ""
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await ApiClient.post('/movie', form);
            console.log(response);

            // ⬅⬅⬅ PENTING: PINDAH KE MOVIES
            navigate("/movies");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="container mx-auto">
            <h4>Add Movie Page</h4>
            <NavLink to="/movies" className="btn btn-primary">List Movie</NavLink>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formJudul">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                        value={form.judul}
                        onChange={handleInputChange}
                        name="judul"
                        type="text"
                        placeholder="Judul Film"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTahunRilis">
                    <Form.Label>Tahun Rilis</Form.Label>
                    <Form.Control
                        value={form.tahunRilis}
                        onChange={handleInputChange}
                        name="tahunRilis"
                        type="text"
                        placeholder="Tahun Rilis"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSutradara">
                    <Form.Label>Sutradara</Form.Label>
                    <Form.Control
                        value={form.sutradara}
                        onChange={handleInputChange}
                        name="sutradara"
                        type="text"
                        placeholder="Sutradara"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Simpan
                </Button>
            </Form>
            </div>
        </>
    );
}

export default AddMovie;