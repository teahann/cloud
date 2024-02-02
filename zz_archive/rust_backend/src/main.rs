use axum::extract;
use axum::{
    extract::{State},
    routing::{get}, Json, Router,
};
use axum_error::Result;
use serde::{Deserialize, Serialize};
use sqlx::sqlite::SqlitePool;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() -> Result<()> {
  let _ = dotenv::dotenv();
  let url = std::env::var("DATABASE_URL")?;
  let pool = SqlitePool::connect(&url).await?;

  let app = Router::new()
    .route("/commands", get(commands))
    .route("/compounds", get(compounds))
    .route("/compounds/:id", get(compound))
    .route("/celestials", get(celestials))
    .route("/celestials/:id", get(celestial))
    .route("/greetings", get(greetings))
    .route("/images", get(images))
    .route("/images/:id", get(image))
    .route("/jobs", get(jobs))
    .route("/languages", get(languages))
    .route("/languages/:id", get(language))
    .with_state(pool)
    .layer(CorsLayer::very_permissive());

  let address = SocketAddr::from(([127, 0, 0, 1], 8000));
  println!("Starting server on http://{address}");
  Ok(axum::Server::bind(&address).serve(app.into_make_service()).await?)
}

#[derive(Serialize, Deserialize)]
struct Command {
  id: i64,
  name: String,
  url: String,
  show: bool
}

#[derive(Serialize, Deserialize)]
struct Compound {
  id: i64,
  pid: i64,
  name: String,
  url: String,
  category: String
}

#[derive(Serialize, Deserialize)]
struct Celestial {
  id: i64,
  its_id: Option<String>,
  name: String,
  region: String,
  about: String,
  photo: Option<String>,
  url: String,
  sun_au: f64,
  sidereal_orbit: f64
}

#[derive(Serialize, Deserialize)]
struct Greeting {
  id: i64,
  greeting: String,
  language: String
}

#[derive(Serialize, Deserialize)]
struct Image {
  id: i64,
  filename: String,
  name: String,
  ext: String,
  x: i64,
  y: i64,
  show: bool
}

#[derive(Serialize, Deserialize)]
struct Job {
  id: i64,
  name: String,
  salary: i64,
  training: String
}

#[derive(Serialize, Deserialize)]
struct Language {
  id: i64,
  name: String,
  category: String,
  note: String,
  year: i64,
  url: String
}

async fn commands(State(pool): State<SqlitePool>) -> Result<Json<Vec<Command>>> {
  let commands = sqlx::query_as!(Command, "SELECT id, name, url, show FROM commands")
    .fetch_all(&pool)
    .await?;
  Ok(Json(commands))
}

async fn compounds(State(pool): State<SqlitePool>) -> Result<Json<Vec<Compound>>> {
  let compounds = sqlx::query_as!(Compound, "SELECT id, pid, name, url, category FROM compounds")
    .fetch_all(&pool)
    .await?;
  Ok(Json(compounds))
}

async fn compound(State(pool): State<SqlitePool>, extract::Path(name): extract::Path<String>,) -> Result<Json<Compound>> {
  let compound = sqlx::query_as!(Compound,"SELECT id, pid, name, url, category FROM compounds WHERE upper(name) = upper(?)", name)
    .fetch_one(&pool)
    .await?;
  Ok(Json(compound))
}

async fn celestials(State(pool): State<SqlitePool>) -> Result<Json<Vec<Celestial>>> {
  let celestials = sqlx::query_as!(Celestial, "SELECT id, its_id, name, region, about, photo, url, sun_au, sidereal_orbit FROM celestials")
    .fetch_all(&pool)
    .await?;
  Ok(Json(celestials))
}

async fn celestial(State(pool): State<SqlitePool>, extract::Path(name): extract::Path<String>,) -> Result<Json<Celestial>> {
  let celestial = sqlx::query_as!(Celestial,"SELECT id, its_id, name, region, about, photo, url, sun_au, sidereal_orbit FROM celestials WHERE upper(name) = upper(?)", name)
    .fetch_one(&pool)
    .await?;
  Ok(Json(celestial))
}

async fn greetings(State(pool): State<SqlitePool>) -> Result<Json<Vec<Greeting>>> {
  let greetings = sqlx::query_as!(Greeting, "SELECT id, greeting, language FROM greetings")
    .fetch_all(&pool)
    .await?;
  Ok(Json(greetings))
}

async fn images(State(pool): State<SqlitePool>) -> Result<Json<Vec<Image>>> {
  let images = sqlx::query_as!(Image, "SELECT id, filename, name, ext, x, y, show FROM images")
    .fetch_all(&pool)
    .await?;
  Ok(Json(images))
}

async fn image(State(pool): State<SqlitePool>, extract::Path(filename): extract::Path<String>,) -> Result<Json<Image>> {
  let image = sqlx::query_as!(Image, "SELECT id, filename, name, ext, x, y, show FROM images WHERE filename = ?", filename)
    .fetch_one(&pool)
    .await?;
  Ok(Json(image))
}

async fn jobs(State(pool): State<SqlitePool>) -> Result<Json<Vec<Job>>> {
  let jobs = sqlx::query_as!(Job, "SELECT id, name, salary, training FROM jobs")
    .fetch_all(&pool)
    .await?;
  Ok(Json(jobs))
}

async fn languages(State(pool): State<SqlitePool>) -> Result<Json<Vec<Language>>> {
  let languages = sqlx::query_as!(Language, "SELECT id, name, category, note, year, url FROM languages")
    .fetch_all(&pool)
    .await?;
  Ok(Json(languages))
}

async fn language(State(pool): State<SqlitePool>, extract::Path(name): extract::Path<String>,) -> Result<Json<Language>> {
  let image = sqlx::query_as!(Language, "SELECT id, name, category, note, year, url FROM languages WHERE upper(name) = upper(replace(?, '_', ' '))", name)
    .fetch_one(&pool)
    .await?;
  Ok(Json(image))
}
