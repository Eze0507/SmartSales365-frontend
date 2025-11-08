import react, {useEffect, useState} from 'react';
import {getAllRoles, getRoleById, deleteRole} from '../../api/RolApi.jsx';
import Table from '../../components/Table.jsx';

const RolList = () =>{
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {loadRoles();}, []);

    const loadRoles = async () => {
        try{
            setIsLoading(true);
            const data = await getAllRoles();
            setRoles(data);
        }catch(err){
            setError('Error al cargar los roles.');
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Esta seguro que desea eliminar este rol?')){
            try{
                await deleteRole(id);
                setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
            }catch (err){
                alert('Error al eliminar el rol.');
            }
        }
    };
    
    const handleEdit = (id) => {
        console.log('Navegar a editar ID', id);
    }

    const columns = [
        {header: 'ID', accessor: 'id'},
        {header: 'Nombre', accessor: 'name'},
    ];

    const renderActions = (item) => (
        <div className="flex gap-3">
            <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-900 font-medium">
                Editar / Ver
            </button>
            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-medium">
                Eliminar
            </button>
        </div>
    );

    if (isLoading) return <div className='p-8'>cargando ...</div>;
    if (error) return <div className='p-8'>{error}</div>

    console.log(roles);
    return (
        <div className="p-6 bg-white rounded shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
                <button onClick={() => console.log("Crear nuevo")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Nuevo
                </button>
            </div>
            <Table columns={columns} data={roles} renderActions={renderActions} />
        </div>
    );
}

export default RolList;