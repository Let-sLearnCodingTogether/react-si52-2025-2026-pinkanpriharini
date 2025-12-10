import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import ApiClient from "../../utils/ApiClient";

interface Movie {
    _id: string;
    judul: string;
    tahunRilis: string;
    sutradara: string;
    createAt: string;
    updateAt: string;
}

function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMovies = useCallback(async () => {
        setLoading(true)
        const response = await ApiClient.get("/movie");
        if (response.status === 200) {
            setMovies(response.data.data);
            setLoading(false)
        }
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Yakin ingin menghapus movie ini?");
        if (!confirmDelete) return;

        const response = await ApiClient.delete(`/movie/${id}`);

        if (response.status === 200) {
            alert("Movie berhasil dihapus!");
            fetchMovies(); // refresh list
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className="container mx-auto">
            <div className="d-flex justify-content-between mb-3">
                <h2>Movie Page</h2>
                <NavLink to="movies/add-movie" className="btn btn-primary">
                    Add movie
                </NavLink>
            </div>

            <table className="table table-striped table-bordered table-hover align-middle">
                <thead className="table-dark text-center">
                    <tr>
                        <th style={{ width: "60px" }}>No</th>
                        <th>Judul</th>
                        <th style={{ width: "150px" }}>Tahun Rilis</th>
                        <th>Sutradara</th>
                        <th style={{ width: "120px" }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5}>Loading....</td>
                        </tr>
                    }
                    {movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <tr key={movie._id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{movie.judul}</td>
                                <td className="text-center">{movie.tahunRilis}</td>
                                <td>{movie.sutradara}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => handleDelete(movie._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-3">
                                No movie found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Movies;
