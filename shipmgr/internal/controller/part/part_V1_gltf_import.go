package part

import (
	"context"
	"shipmgr/internal/model"
	"shipmgr/internal/service"

	"shipmgr/api/part/V1"
)

func (c *ControllerV1) GltfImport(ctx context.Context, req *V1.GltfImportReq) (res *V1.GltfImportRes, err error) {
	for _, value := range req.Nodes {
		inp := model.PartInput{
			Name: value.Name,
			Mesh: value.Mesh,
		}
		service.Shipmanage().AddPart(ctx, inp)
	}
	return &V1.GltfImportRes{Status: true}, nil
}
