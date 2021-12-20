using Microsoft.AspNetCore.Mvc;

namespace API.eStore.Controllers
{
    public class BuggyController : ApiBaseController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() => NotFound();

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() => BadRequest(new ProblemDetails { Title = "This is a bad request" });

        [HttpGet("unauthorized")]
        public ActionResult GetUnAuthoized() => Unauthorized();

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is first error");
            ModelState.AddModelError("Problem2", "This is second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError() => throw new System.Exception("This is server error");
    }
}
