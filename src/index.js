const { response } = require('express');
const express = require('express');
const {uuid} = require('uuidv4');

const app = express();
app.use(express.json())
const projects = [];
/** 
 * Métodos HTTP:
 * 
 * GET: Bsucar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT ou PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação do back-end
*/

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação / Direto no html usando ?oque = parametro
 * Route Params: Identificar recursos (atualizar/Deletar) / :id por ex
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

app.get('/projects', (request,response) => {
    //const query = request.query;

    //console.log(query);

    return response.json(projects)
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project =  {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project)
})

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const { title, owner } = request.body;

    const projectindex = projects.findIndex(project => project.id === id);
    
    if (projectindex < 0){
        return response.status(400).json({error: 'Project not found'})
    }

    const project = {
        id,
        title,
        owner,
    };

projects[projectindex] = project;

    return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
    const [ id ]  = request.params;

    const projectindex = projects.findIndex(project => project.id === id);
    
    if (projectindex < 0){
        return response.status(400).json({error: 'Project not found'})
    }

    projects.splice(projectindex,1);

    return response.status(204).send()
});

app.listen(3333, () => {console.log('Iniciei o back-end')});