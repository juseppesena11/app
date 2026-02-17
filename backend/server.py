from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="AUREON API", description="API para site institucional AUREON - Capoto e Microcimento")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service_type: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="pending")

class ContactRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=9, max_length=20)
    service_type: str
    message: str = Field(..., min_length=10, max_length=2000)

class PortfolioProject(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: str
    image_url: str
    location: str
    year: int
    featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PortfolioProjectCreate(BaseModel):
    title: str
    description: str
    category: str
    image_url: str
    location: str
    year: int
    featured: bool = False

# API Routes
@api_router.get("/")
async def root():
    return {"message": "AUREON API - Especialistas em Capoto e Microcimento"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AUREON API"}

# Contact/Quote Request Routes
@api_router.post("/contact", response_model=ContactRequest)
async def create_contact_request(input: ContactRequestCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactRequest(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_requests.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactRequest])
async def get_contact_requests():
    contacts = await db.contact_requests.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact['created_at'], str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

# Portfolio Routes
@api_router.get("/portfolio", response_model=List[PortfolioProject])
async def get_portfolio_projects(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    projects = await db.portfolio_projects.find(query, {"_id": 0}).to_list(100)
    for project in projects:
        if isinstance(project.get('created_at'), str):
            project['created_at'] = datetime.fromisoformat(project['created_at'])
    return projects

@api_router.post("/portfolio", response_model=PortfolioProject)
async def create_portfolio_project(input: PortfolioProjectCreate):
    project_dict = input.model_dump()
    project_obj = PortfolioProject(**project_dict)
    
    doc = project_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.portfolio_projects.insert_one(doc)
    return project_obj

@api_router.get("/portfolio/{project_id}", response_model=PortfolioProject)
async def get_portfolio_project(project_id: str):
    project = await db.portfolio_projects.find_one({"id": project_id}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    if isinstance(project.get('created_at'), str):
        project['created_at'] = datetime.fromisoformat(project['created_at'])
    return project

# Seed initial portfolio data
@api_router.post("/seed-portfolio")
async def seed_portfolio():
    existing = await db.portfolio_projects.count_documents({})
    if existing > 0:
        return {"message": "Portfolio já possui dados", "count": existing}
    
    projects = [
        {
            "id": str(uuid.uuid4()),
            "title": "Moradia Moderna em Cascais",
            "description": "Aplicação de sistema ETICS completo com acabamento em reboco silicone branco. Melhoria de eficiência energética em 40%.",
            "category": "capoto",
            "image_url": "https://images.unsplash.com/photo-1770163821346-b7f07e59c98b?w=800",
            "location": "Cascais, Portugal",
            "year": 2024,
            "featured": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Apartamento T3 em Lisboa",
            "description": "Pavimento e paredes em microcimento cinza claro. Acabamento acetinado de alta durabilidade.",
            "category": "microcimento",
            "image_url": "https://images.unsplash.com/photo-1770086962001-3da4f60e7db5?w=800",
            "location": "Lisboa, Portugal",
            "year": 2024,
            "featured": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Edifício Residencial no Porto",
            "description": "Reabilitação de fachada com sistema ETICS. 12 apartamentos, 2000m² de área intervencionada.",
            "category": "capoto",
            "image_url": "https://images.unsplash.com/photo-1702392183172-17fdef8002b4?w=800",
            "location": "Porto, Portugal",
            "year": 2023,
            "featured": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Loft Industrial em Setúbal",
            "description": "Microcimento em pavimentos e bancadas. Acabamento mate com tratamento anti-manchas.",
            "category": "microcimento",
            "image_url": "https://images.unsplash.com/photo-1722650362655-b01ca4d53565?w=800",
            "location": "Setúbal, Portugal",
            "year": 2023,
            "featured": False,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Casa de Férias no Algarve",
            "description": "Sistema ETICS com acabamento em reboco mineral. Proteção térmica superior para clima quente.",
            "category": "capoto",
            "image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "location": "Albufeira, Portugal",
            "year": 2024,
            "featured": False,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Restaurante Gourmet em Sintra",
            "description": "Microcimento em paredes, chão e balcão. Cor terracota personalizada para ambiente acolhedor.",
            "category": "microcimento",
            "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "location": "Sintra, Portugal",
            "year": 2023,
            "featured": False,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.portfolio_projects.insert_many(projects)
    return {"message": "Portfolio inicializado com sucesso", "count": len(projects)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
